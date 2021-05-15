# Third Party Stuff
from django.db import models
from django.utils.translation import gettext_lazy as _

# Agenda Stuff
from apps.base.models import TimeStampedUUIDModel
from apps.users.models import User


class Customer(TimeStampedUUIDModel):
    name = models.CharField(_("name"), max_length=254, help_text=_("full name"))

    class Meta:
        verbose_name = _("customer")
        verbose_name_plural = _("customers")
        ordering = ("name",)

    def __str__(self) -> str:
        return self.name


class ActivityType(TimeStampedUUIDModel):
    name = models.CharField(_("name"), max_length=120)
    value = models.PositiveSmallIntegerField(_("value"), help_text=_("value in minutes."))

    class Meta:
        verbose_name = _("Activity Type")
        verbose_name_plural = _("Activity Types")
        ordering = ("name",)

    def __str__(self) -> str:
        return "{} | {} min".format(self.name, self.value)


class ActivityManager(models.Manager):
    def owner(self, seller):
        queryset = super(ActivityManager, self).all().filter(seller=seller)
        return queryset


class Activity(TimeStampedUUIDModel):
    ACTIVE = "active"
    DEACTIVATED = "deactivated"

    STATUS_CHOICES = (
        (ACTIVE, _("Active")),
        (DEACTIVATED, _("Deactivated")),
    )

    schedule_at = models.DateTimeField(_("schedule at"))
    notes = models.TextField(_("notes"), blank=True)
    status = models.CharField(_("status"), max_length=11, choices=STATUS_CHOICES, default=ACTIVE)

    type = models.ForeignKey(ActivityType, on_delete=models.CASCADE, verbose_name=_("activity type"))
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, verbose_name=_("customer"))
    seller = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("seller"))

    objects = ActivityManager()

    class Meta:
        verbose_name = _("Activity")
        verbose_name_plural = _("Activities")
        ordering = ("-schedule_at",)

    def __str__(self) -> str:
        return "{} {} {}".format(self.seller, self.customer, self.schedule_at)
