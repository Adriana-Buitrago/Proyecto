INSERT INTO events (id, name, event_type, date, location, duration_hours, description, image_url) VALUES
('event-001', 'Boda de Laura y Andrés', 'Boda', '14 de noviembre de 2026', 'Hacienda Los Arrayanes, Bogotá', 6, 'DJ, sonido profesional, luces ambientales y pista de baile.', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900'),
('event-002', 'Cumpleaños de Santiago', 'Cumpleaños', '21 de noviembre de 2026', 'Salón Mirador, Chía', 5, 'Música crossover, cabina DJ y sistema de sonido para baile.', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900'),
('event-003', 'Fiesta empresarial Nova', 'Empresarial', '4 de diciembre de 2026', 'Centro de Convenciones, Bogotá', 4, 'Sonido para discursos, micrófonos inalámbricos e iluminación.', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900'),
('event-004', 'Quinceañera de Valentina', 'Quinceañera', '12 de diciembre de 2026', 'Club Social La Colina, Bogotá', 6, 'DJ, luces móviles, máquina de humo y sonido para pista.', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900');

INSERT INTO equipment (id, name, category, brand, quantity, status, price_per_day, description) VALUES
('eq-001', 'Parlante activo JBL EON 715', 'Sonido', 'JBL', 2, 'Disponible', 180000, 'Parlantes principales para eventos medianos.'),
('eq-002', 'Subwoofer JBL PRX 818XLF', 'Sonido', 'JBL', 2, 'Reservado', 220000, 'Graves potentes para pistas de baile.'),
('eq-003', 'Consola DJ Pioneer DDJ-FLX10', 'Sonido', 'Pioneer DJ', 1, 'Disponible', 250000, 'Controladora profesional para mezcla musical.'),
('eq-004', 'Micrófono inalámbrico Shure BLX', 'Sonido', 'Shure', 3, 'Disponible', 60000, 'Micrófonos para presentaciones y brindis.'),
('eq-005', 'Cabeza móvil Beam moving head', 'Iluminación', 'Chauvet DJ', 4, 'Disponible', 90000, 'Efectos dinámicos para escenario y pista.'),
('eq-006', 'Barra LED RGB', 'Iluminación', 'ADJ', 6, 'En mantenimiento', 45000, 'Iluminación ambiental con mezcla de colores.'),
('eq-007', 'Láser RGB para escenario', 'Iluminación', 'Laserworld', 1, 'Disponible', 75000, 'Efectos de luz para fiestas y discotecas.'),
('eq-008', 'Máquina de humo', 'Accesorios', 'Antari', 2, 'Reservado', 55000, 'Humo escénico para resaltar los haces de luz.'),
('eq-009', 'Trípode para parlante', 'Accesorios', 'Proel', 4, 'Disponible', 20000, 'Soporte estable para parlantes PA.'),
('eq-010', 'Cable XLR de 10 metros', 'Accesorios', 'Soundking', 8, 'Disponible', 8000, 'Conexión balanceada para audio profesional.'),
('eq-011', 'Mezclador digital de audio', 'Sonido', 'Behringer', 1, 'Disponible', 160000, 'Control de canales y procesamiento de sonido.'),
('eq-012', 'Par LED tipo wash', 'Iluminación', 'ADJ', 8, 'Disponible', 35000, 'Baño de color para paredes y decoración.');
