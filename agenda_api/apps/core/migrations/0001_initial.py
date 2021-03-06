# Generated by Django 3.1.8 on 2021-05-18 22:42

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="ActivityType",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=120, verbose_name="name")),
                (
                    "value",
                    models.PositiveSmallIntegerField(
                        help_text="value in minutes.",
                        validators=[django.core.validators.MinValueValidator(1)],
                        verbose_name="value",
                    ),
                ),
            ],
            options={
                "verbose_name": "Activity Type",
                "verbose_name_plural": "Activity Types",
                "ordering": ("name",),
            },
        ),
        migrations.CreateModel(
            name="Customer",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(help_text="full name", max_length=254, verbose_name="name")),
                (
                    "seller",
                    models.ForeignKey(
                        blank=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="customers",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "customer",
                "verbose_name_plural": "customers",
                "ordering": ("name",),
            },
        ),
        migrations.CreateModel(
            name="Activity",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                ("schedule_at", models.DateTimeField(verbose_name="schedule at")),
                ("finish_at", models.DateTimeField(blank=True, verbose_name="finish at")),
                ("notes", models.TextField(blank=True, verbose_name="notes")),
                (
                    "status",
                    models.CharField(
                        choices=[("active", "Active"), ("deactivated", "Deactivated")],
                        default="active",
                        max_length=11,
                        verbose_name="status",
                    ),
                ),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.customer", verbose_name="customer"
                    ),
                ),
                (
                    "seller",
                    models.ForeignKey(
                        blank=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="activities",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="seller",
                    ),
                ),
                (
                    "type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="core.activitytype",
                        verbose_name="activity type",
                    ),
                ),
            ],
            options={
                "verbose_name": "Activity",
                "verbose_name_plural": "Activities",
                "ordering": ("-schedule_at",),
            },
        ),
    ]
