SELECT
    VERSION() AS `version` START TRANSACTION
SELECT
    DATABASE() AS `db_name`
SELECT
    `TABLE_SCHEMA`,
    `TABLE_NAME`
FROM
    `INFORMATION_SCHEMA`.`TABLES`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'diarios'
UNION
SELECT
    `TABLE_SCHEMA`,
    `TABLE_NAME`
FROM
    `INFORMATION_SCHEMA`.`TABLES`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'day'
UNION
SELECT
    `TABLE_SCHEMA`,
    `TABLE_NAME`
FROM
    `INFORMATION_SCHEMA`.`TABLES`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'semanas'
UNION
SELECT
    `TABLE_SCHEMA`,
    `TABLE_NAME`
FROM
    `INFORMATION_SCHEMA`.`TABLES`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'ingresos'
UNION
SELECT
    `TABLE_SCHEMA`,
    `TABLE_NAME`
FROM
    `INFORMATION_SCHEMA`.`TABLES`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'data_usuario'
UNION
SELECT
    `TABLE_SCHEMA`,
    `TABLE_NAME`
FROM
    `INFORMATION_SCHEMA`.`TABLES`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'usuario'
UNION
SELECT
    `TABLE_SCHEMA`,
    `TABLE_NAME`
FROM
    `INFORMATION_SCHEMA`.`TABLES`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'frecuentes'
UNION
SELECT
    `TABLE_SCHEMA`,
    `TABLE_NAME`
FROM
    `INFORMATION_SCHEMA`.`TABLES`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'cobros_fre'
SELECT
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'diarios'
UNION
SELECT
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'day'
UNION
SELECT
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'semanas'
UNION
SELECT
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'ingresos'
UNION
SELECT
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'data_usuario'
UNION
SELECT
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'usuario'
UNION
SELECT
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'frecuentes'
UNION
SELECT
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'cobros_fre'
SELECT
    *
FROM
    (
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'diarios'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'day'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'semanas'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'ingresos'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'data_usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'frecuentes'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'cobros_fre'
    ) `kcu`
WHERE
    `CONSTRAINT_NAME` = 'PRIMARY'
SELECT
    `SCHEMA_NAME`,
    `DEFAULT_CHARACTER_SET_NAME` as `CHARSET`,
    `DEFAULT_COLLATION_NAME` AS `COLLATION`
FROM
    `INFORMATION_SCHEMA`.`SCHEMATA`
SELECT
    `s`.*
FROM
    (
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`STATISTICS`
        WHERE
            `TABLE_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'diarios'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`STATISTICS`
        WHERE
            `TABLE_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'day'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`STATISTICS`
        WHERE
            `TABLE_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'semanas'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`STATISTICS`
        WHERE
            `TABLE_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'ingresos'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`STATISTICS`
        WHERE
            `TABLE_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'data_usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`STATISTICS`
        WHERE
            `TABLE_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`STATISTICS`
        WHERE
            `TABLE_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'frecuentes'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`STATISTICS`
        WHERE
            `TABLE_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'cobros_fre'
    ) `s`
    LEFT JOIN (
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'diarios'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'day'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'semanas'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'ingresos'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'data_usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'frecuentes'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'cobros_fre'
    ) `rc` ON `s`.`INDEX_NAME` = `rc`.`CONSTRAINT_NAME`
    AND `s`.`TABLE_SCHEMA` = `rc`.`CONSTRAINT_SCHEMA`
WHERE
    `s`.`INDEX_NAME` != 'PRIMARY'
    AND `rc`.`CONSTRAINT_NAME` IS NULL
SELECT
    `kcu`.`TABLE_SCHEMA`,
    `kcu`.`TABLE_NAME`,
    `kcu`.`CONSTRAINT_NAME`,
    `kcu`.`COLUMN_NAME`,
    `kcu`.`REFERENCED_TABLE_SCHEMA`,
    `kcu`.`REFERENCED_TABLE_NAME`,
    `kcu`.`REFERENCED_COLUMN_NAME`,
    `rc`.`DELETE_RULE` `ON_DELETE`,
    `rc`.`UPDATE_RULE` `ON_UPDATE`
FROM
    (
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'diarios'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'day'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'semanas'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'ingresos'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'data_usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'frecuentes'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        WHERE
            `kcu`.`TABLE_SCHEMA` = 'baro'
            AND `kcu`.`TABLE_NAME` = 'cobros_fre'
    ) `kcu`
    INNER JOIN (
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'diarios'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'day'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'semanas'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'ingresos'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'data_usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'usuario'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'frecuentes'
        UNION
        SELECT
            *
        FROM
            `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS`
        WHERE
            `CONSTRAINT_SCHEMA` = 'baro'
            AND `TABLE_NAME` = 'cobros_fre'
    ) `rc` ON `rc`.`CONSTRAINT_SCHEMA` = `kcu`.`CONSTRAINT_SCHEMA`
    AND `rc`.`TABLE_NAME` = `kcu`.`TABLE_NAME`
    AND `rc`.`CONSTRAINT_NAME` = `kcu`.`CONSTRAINT_NAME`
SELECT
    VERSION() AS `version`
SELECT
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    `TABLE_SCHEMA` = 'baro'
    AND `TABLE_NAME` = 'typeorm_metadata' COMMIT Schema synchronization finished successfully.