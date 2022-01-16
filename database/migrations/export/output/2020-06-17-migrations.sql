USE [Dawn_Data]
GO
/****** Object:  Table [dbo].[knex_migrations]    Script Date: 2020-06-17 14:10:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[knex_migrations](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[batch] [int] NULL,
	[migration_time] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[knex_migrations_lock]    Script Date: 2020-06-17 14:10:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[knex_migrations_lock](
	[index] [int] IDENTITY(1,1) NOT NULL,
	[is_locked] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[index] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[knex_seeds]    Script Date: 2020-06-17 14:10:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[knex_seeds](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[date] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[knex_migrations] ON 

INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (1, N'20191203145059_create_dip_form_structure.ts', 1, CAST(N'2020-06-17T12:05:52.6070000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (2, N'20200108100804_dip_add_form_id.ts', 1, CAST(N'2020-06-17T12:05:52.6270000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (3, N'20200110094425_change_dip_table_names.ts', 1, CAST(N'2020-06-17T12:05:52.7970000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (4, N'20200113122718_add_repayment_field.ts', 1, CAST(N'2020-06-17T12:05:52.8170000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (5, N'20200113202327_add_introducer_type_table.ts', 1, CAST(N'2020-06-17T12:05:52.8330000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (6, N'20200113203018_add_dip_introducer_type.ts', 1, CAST(N'2020-06-17T12:05:52.8530000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (7, N'20200114064653_add_securities_properties.ts', 1, CAST(N'2020-06-17T12:05:52.8730000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (8, N'20200114133245_add_opfl_table_and_relations.ts', 1, CAST(N'2020-06-17T12:05:52.8970000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (9, N'20200114161257_add_additional_fields_for_loan.ts', 1, CAST(N'2020-06-17T12:05:52.9130000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (10, N'20200114171038_add_additional_fields_for_loan_property_development.ts', 1, CAST(N'2020-06-17T12:05:52.9300000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (11, N'20200114193249_change_column_type_for_loan_financial_details.ts', 1, CAST(N'2020-06-17T12:05:52.9530000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (12, N'20200114202557_change_contact_table.ts', 1, CAST(N'2020-06-17T12:05:52.9770000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (13, N'20200114213727_add_case_number_for_dip.ts', 1, CAST(N'2020-06-17T12:05:52.9930000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (14, N'20200115124052_add_status_table_for_dip.ts', 1, CAST(N'2020-06-17T12:05:53.0170000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (15, N'20200121103522_add_broker_table.ts', 1, CAST(N'2020-06-17T12:05:53.0430000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (16, N'20200128083316_add_additional_financial_details.ts', 1, CAST(N'2020-06-17T12:05:53.0730000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (17, N'20200203102915_add_additional_financial_details.ts', 1, CAST(N'2020-06-17T12:05:53.0930000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (18, N'20200204130426_changes_company_number_type.ts', 1, CAST(N'2020-06-17T12:05:53.1100000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (19, N'20200204145905_moves_opfl_charge_to_each_security.ts', 1, CAST(N'2020-06-17T12:05:53.1330000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (20, N'20200205080425_add_additional_fields.ts', 1, CAST(N'2020-06-17T12:05:53.1500000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (21, N'20200205091611_update_market_value_type.ts', 1, CAST(N'2020-06-17T12:05:53.1670000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (22, N'20200206160232_change_date_type_to_numeric.ts', 1, CAST(N'2020-06-17T12:05:53.2630000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (23, N'20200210151515_add_additional_fields.ts', 1, CAST(N'2020-06-17T12:05:53.2830000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (24, N'20200211104818_add_additional_fields_related_with_loan.ts', 1, CAST(N'2020-06-17T12:05:53.3030000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (25, N'20200212135326_adds_origination_schema.ts', 1, CAST(N'2020-06-17T12:05:53.3200000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (26, N'20200213091711_change_schema_of_all_tables_to_origination.ts', 1, CAST(N'2020-06-17T12:05:53.3470000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (27, N'20200213104153_remove_prefix_from_table_names.ts', 1, CAST(N'2020-06-17T12:05:53.4230000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (28, N'20200213114136_rename_column_names_to_follow_camel_case.ts', 1, CAST(N'2020-06-17T12:05:53.9470000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (29, N'20200218122437_change_column_type.ts', 1, CAST(N'2020-06-17T12:05:53.9600000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (30, N'20200227125840_add_cases_table.ts', 1, CAST(N'2020-06-17T12:05:53.9870000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (31, N'20200303072246_remove_field_from_dip_and_put_into_case.ts', 1, CAST(N'2020-06-17T12:05:54.0070000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (32, N'20200309171821_create_drawndowns_loan_financial_table.ts', 1, CAST(N'2020-06-17T12:05:54.0230000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (33, N'20200312103900_add_gdv_column_to_security.ts', 1, CAST(N'2020-06-17T12:05:54.0370000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (34, N'20200313164729_add_existing_mortgage_into_securities.ts', 1, CAST(N'2020-06-17T12:05:54.0530000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (35, N'20200317132349_remove_exit_fee_percent.ts', 1, CAST(N'2020-06-17T12:05:54.0670000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (36, N'20200319121334_change_drawdown_column_type.ts', 1, CAST(N'2020-06-17T12:05:54.0830000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (37, N'20200320112522_add_is_manual_mode_field.ts', 1, CAST(N'2020-06-17T12:05:54.0930000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (38, N'20200320124216_change_column_types.ts', 1, CAST(N'2020-06-17T12:05:54.1170000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (39, N'20200324014203_add_history_table.ts', 1, CAST(N'2020-06-17T12:05:54.1300000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (40, N'20200325171510_add_enquiry_flag.ts', 1, CAST(N'2020-06-17T12:05:54.1430000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (41, N'20200326102046_update_enquiry_if_empty.ts', 1, CAST(N'2020-06-17T12:05:54.1600000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (42, N'20200330173818_adds application step status type.ts', 1, CAST(N'2020-06-17T12:05:54.1770000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (43, N'20200330184955_create_stage_field.ts', 1, CAST(N'2020-06-17T12:05:54.2370000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (44, N'20200331111136_adds_application_step.ts', 1, CAST(N'2020-06-17T12:05:54.2530000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (45, N'20200403114652_create_applicant_table.ts', 1, CAST(N'2020-06-17T12:05:54.2830000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (46, N'20200403223322_change_foreign_key.ts', 1, CAST(N'2020-06-17T12:05:54.3530000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (47, N'20200406135949_drop_contraint_for_address.ts', 1, CAST(N'2020-06-17T12:05:54.4500000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (48, N'20200407104832_drop_contraints.ts', 1, CAST(N'2020-06-17T12:05:54.5070000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (49, N'20200407180952_create_credit_history_table.ts', 1, CAST(N'2020-06-17T12:05:54.5300000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (50, N'20200409100907_add_new_columns_to_loan_financial_details.ts', 1, CAST(N'2020-06-17T12:05:54.5430000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (51, N'20200410093116_create_introducer_application_table.ts', 1, CAST(N'2020-06-17T12:05:54.5600000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (52, N'20200410133315_create_solicitor_application_table.ts', 1, CAST(N'2020-06-17T12:05:54.5770000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (53, N'20200414124711_add_additional_information_field_for_case.ts', 1, CAST(N'2020-06-17T12:05:54.5900000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (54, N'20200415133431_create_table_case_property.ts', 1, CAST(N'2020-06-17T12:05:54.6070000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (55, N'20200417131423_add_declaration_signature_fields.ts', 1, CAST(N'2020-06-17T12:05:54.6170000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (56, N'20200420120809_adds_property_portfolio.ts', 1, CAST(N'2020-06-17T12:05:54.6330000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (57, N'20200420165651_remove_specific_details_fields_from_credit_history.ts', 1, CAST(N'2020-06-17T12:05:54.6500000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (58, N'20200420203314_create_table_assets.ts', 1, CAST(N'2020-06-17T12:05:54.6670000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (59, N'20200421080614_adds_years_remaining_on_lease.ts', 1, CAST(N'2020-06-17T12:05:54.6830000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (60, N'20200421133839_add_additional_fields_to_individuals.ts', 1, CAST(N'2020-06-17T12:05:54.7000000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (61, N'20200421144942_adds_assets_liabilities_additional.ts', 1, CAST(N'2020-06-17T12:05:54.7170000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (62, N'20200421162959_add_mobile_phone_into_contact_table.ts', 1, CAST(N'2020-06-17T12:05:54.7300000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (63, N'20200427123233_add_repayment_method_details.ts', 1, CAST(N'2020-06-17T12:05:54.7470000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (64, N'20200427150250_change_column_type_to_decimal.ts', 1, CAST(N'2020-06-17T12:05:54.7630000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (65, N'20200428073202_add_case_status_table.ts', 1, CAST(N'2020-06-17T12:05:54.7830000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (66, N'20200428205344_moves_created_date_into_case_table.ts', 1, CAST(N'2020-06-17T12:05:55.8030000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (67, N'20200505114455_add_valuation_table.ts', 1, CAST(N'2020-06-17T12:05:55.8200000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (68, N'20200506000000_create_amlkyc_table.ts', 1, CAST(N'2020-06-17T12:05:55.8370000' AS DateTime2))
INSERT [dbo].[knex_migrations] ([id], [name], [batch], [migration_time]) VALUES (69, N'20200519114753_adds_surveyor_to_valuation_flow.ts', 1, CAST(N'2020-06-17T12:05:55.8500000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[knex_migrations] OFF
SET IDENTITY_INSERT [dbo].[knex_migrations_lock] ON 

INSERT [dbo].[knex_migrations_lock] ([index], [is_locked]) VALUES (1, 0)
SET IDENTITY_INSERT [dbo].[knex_migrations_lock] OFF
SET IDENTITY_INSERT [dbo].[knex_seeds] ON 

INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (1, N'adds_application_step_statuses.ts', CAST(N'2020-06-17T12:05:54.9070000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (2, N'adds_cases_status.ts', CAST(N'2020-06-17T12:05:55.0000000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (3, N'adds_completed_statuses.ts', CAST(N'2020-06-17T12:05:55.0700000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (4, N'adds_new_case_statuses.ts', CAST(N'2020-06-17T12:05:55.1330000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (5, N'add_advance_type.ts', CAST(N'2020-06-17T12:05:55.2130000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (6, N'add_building_type.ts', CAST(N'2020-06-17T12:05:55.2970000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (7, N'add_contact_type.ts', CAST(N'2020-06-17T12:05:55.3870000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (8, N'add_introducer_type.ts', CAST(N'2020-06-17T12:05:55.4800000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (9, N'add_loan_type.ts', CAST(N'2020-06-17T12:05:55.5500000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (10, N'add_opfl_type.ts', CAST(N'2020-06-17T12:05:55.6230000' AS DateTime2))
INSERT [dbo].[knex_seeds] ([id], [name], [date]) VALUES (11, N'add_status_for_dip.ts', CAST(N'2020-06-17T12:05:55.7170000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[knex_seeds] OFF
ALTER TABLE [dbo].[knex_seeds] ADD  DEFAULT (getdate()) FOR [date]
GO
