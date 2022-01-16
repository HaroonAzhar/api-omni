create table Origination_DIP_Introducer
(
	introducer_id int identity,
	introducer_type nvarchar(255)
)

create unique index Origination_DIP_Introducer_introducer_id_uindex
	on Origination_DIP_Introducer (introducer_id)

alter table Origination_DIP_Introducer
	add constraint Origination_DIP_Introducer_pk
		primary key nonclustered (introducer_id)

