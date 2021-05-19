# Standard Library
from datetime import timedelta

# Third Party Stuff
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

# Agenda Stuff
from apps.base.models import TimeStampedUUIDModel
from apps.users.models import User


class Customer(TimeStampedUUIDModel):
    name = models.CharField(_("name"), max_length=254, help_text=_("full name"))
    seller = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name="customers")

    class Meta:
        verbose_name = _("customer")
        verbose_name_plural = _("customers")
        ordering = ("name",)

    def __str__(self) -> str:
        return self.name


class ActivityType(TimeStampedUUIDModel):
    name = models.CharField(_("name"), max_length=120)
    value = models.PositiveSmallIntegerField(
        _("value"), validators=[MinValueValidator(1)], help_text=_("value in minutes."))

    class Meta:
        verbose_name = _("Activity Type")
        verbose_name_plural = _("Activity Types")
        ordering = ("name",)

    @property
    def description(self):
        minutes = _("minutes")
        base_str = "{} | {}".format(self.name, self.value)
        return "{} {}".format(base_str, minutes)

    def __str__(self) -> str:
        return "{} | {} min".format(self.name, self.value)


class Activity(TimeStampedUUIDModel):
    ACTIVE = "active"
    CANCELED = "canceled"

    STATUS_CHOICES = (
        (ACTIVE, _("Active")),
        (CANCELED, _("Canceled")),
    )

    schedule_at = models.DateTimeField(_("schedule at"))
    finish_at = models.DateTimeField(_("finish at"), blank=True)
    notes = models.TextField(_("notes"), blank=True)
    status = models.CharField(_("status"), max_length=11, choices=STATUS_CHOICES, default=ACTIVE)

    type = models.ForeignKey(ActivityType, on_delete=models.CASCADE, verbose_name=_("activity type"))
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, verbose_name=_("customer"))
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, verbose_name=_("seller"), related_name="activities")

    class Meta:
        verbose_name = _("Activity")
        verbose_name_plural = _("Activities")
        ordering = ("-schedule_at",)

    @property
    def status_label(self):
        return self.get_status_display()

    def save(self, **kwargs):
        finish_at = self.schedule_at + timedelta(minutes=self.type.value) - timedelta(milliseconds=1)
        self.finish_at = finish_at
        return super(Activity, self).save(kwargs)

    def __str__(self) -> str:
        return "{} {} {}".format(self.seller, self.customer, self.schedule_at)
