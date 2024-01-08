
insert into person (id, role, user_password, username)
values ('1', 'ROLE_ADMIN', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'Haistachi'),
       ('2', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'User'),
       ('3', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'Alin'),
       ('4', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'Costel'),
       ('5', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'Patme'),
       ('6', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'Amidala'),
       ('7', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'User2'),
       ('8', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'Parola'),
       ('9', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'User3'),
       ('10', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'Pag'),
       ('11', 'ROLE_USER', '$2a$10$qu56kCQQn2ddQe4A1mYdr.vmgN1T43C5nDGiVzpdGM32fdCWcTCyW', 'Noua')
    ON CONFLICT (id)
DO NOTHING;