#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" --password "$POSTGRES_PASS" -f provision.sql