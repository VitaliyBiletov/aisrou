# Generated by Django 3.1.7 on 2021-08-13 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_statesoffunctions_additional_information'),
    ]

    operations = [
        migrations.AlterField(
            model_name='statesoffunctions',
            name='additional_information',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Дополнительная информация'),
        ),
        migrations.AlterField(
            model_name='statesoffunctions',
            name='articulation_apparatus',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Артикуляционный аппарат'),
        ),
        migrations.AlterField(
            model_name='statesoffunctions',
            name='breath',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Дыхание'),
        ),
        migrations.AlterField(
            model_name='statesoffunctions',
            name='hearing',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Слух'),
        ),
        migrations.AlterField(
            model_name='statesoffunctions',
            name='motor_skills',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Моторика'),
        ),
        migrations.AlterField(
            model_name='statesoffunctions',
            name='prosody',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Просодика'),
        ),
        migrations.AlterField(
            model_name='statesoffunctions',
            name='vision',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Зрение'),
        ),
        migrations.AlterField(
            model_name='statesoffunctions',
            name='voice',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Голос'),
        ),
    ]
