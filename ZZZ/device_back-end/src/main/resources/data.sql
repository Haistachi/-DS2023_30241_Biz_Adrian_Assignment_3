
insert into device (id, address, consumption, description, person)
values (1, 'ma doare', 100, 'telefon', 2),
       (2, 'str Drum', 50, 'ceas', 2)
    ON CONFLICT (id)
DO NOTHING;