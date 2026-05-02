#!/bin/bash

GREEN='\e[32m'
YELLOW='\e[33m'
RED='\e[31m'
NC='\e[0m'
UNDERLINE='\e[4m'

if [ -f .env ]; then
    echo -en "${RED}.env file already exists.${NC} Do you want to overwrite it? (${RED}y${NC}/${GREEN}${UNDERLINE}N${NC}) "
    read OVERWRITE_ENV </dev/tty
    if [[ "$OVERWRITE_ENV" =~ ^[Yy]$ ]]; then
        rm .env
        echo -e "${YELLOW}Existing .env file removed. Generating a new one...${NC}"
    else
        echo -e "${RED}Aborting. .env file was not overwritten.${NC}"
        exit 0
    fi
fi

echo -e "${GREEN}Generating .env file with environment variables...${NC}"

echo ""
echo ""

echo -en "${GREEN}DOMAIN$NC 'Used for default values' (default: ${UNDERLINE}beispiel.de${NC}): "
read DOMAIN </dev/tty
DOMAIN=${DOMAIN:-beispiel.de}

echo -en  "${GREEN}BASE_URL_PROTOCOL$NC (default: ${UNDERLINE}http${NC}): "
read BASE_URL_PROTOCOL </dev/tty
BASE_URL_PROTOCOL=${BASE_URL_PROTOCOL:-http}

echo -en  "${GREEN}BASE_URL_HOST$NC (default: ${UNDERLINE}localhost${NC}): "
read BASE_URL_HOST </dev/tty
BASE_URL_HOST=${BASE_URL_HOST:-localhost}

echo -en  "${GREEN}BASE_URL_PORT$NC (default: ${UNDERLINE}3000${NC}): "
read BASE_URL_PORT </dev/tty
BASE_URL_PORT=${BASE_URL_PORT:-3000}

echo -en "${GREEN}ADMIN_EMAIL$NC (default: ${UNDERLINE}admin@${DOMAIN}${NC}): "
read ADMIN_EMAIL </dev/tty
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@${DOMAIN}}

echo -en "${GREEN}ADMIN_FULLNAME$NC (default: ${UNDERLINE}Administrator${NC}): "
read ADMIN_FULLNAME </dev/tty
ADMIN_FULLNAME=${ADMIN_FULLNAME:-Administrator}

echo -en "${GREEN}SUPPORT_EMAIL_ADDRESS$NC (default: ${UNDERLINE}support.irrenanstalt@${DOMAIN}${NC}): "
read SUPPORT_EMAIL_ADDRESS </dev/tty
SUPPORT_EMAIL_ADDRESS=${SUPPORT_EMAIL_ADDRESS:-support.irrenanstalt@${DOMAIN}}

echo -en "${GREEN}Configure SMTP$NC (${UNDERLINE}Y/n${NC}): "
read CONFIGURE_SMTP </dev/tty
CONFIGURE_SMTP=${CONFIGURE_SMTP:-Y}

if [[ "$CONFIGURE_SMTP" =~ ^[Yy]$ ]]; then
    echo -en "${GREEN}SMTP_HOST$NC (default: ${UNDERLINE}smtp.${DOMAIN}${NC}): "
    read SMTP_HOST </dev/tty
    SMTP_HOST=${SMTP_HOST:-smtp.${DOMAIN}}

    echo -en "${GREEN}SMTP_PORT$NC (default: ${UNDERLINE}465${NC}): "
    read SMTP_PORT </dev/tty
    SMTP_PORT=${SMTP_PORT:-465}

    echo -en "${GREEN}SMTP_USER$NC (default: ${UNDERLINE}automatic@${DOMAIN}${NC}): "
    read SMTP_USER </dev/tty
    SMTP_USER=${SMTP_USER:-automatic@${DOMAIN}}

    echo -en "${GREEN}SMTP_PASSWORD$NC: "
    read SMTP_PASSWORD </dev/tty
    SMTP_PASSWORD=${SMTP_PASSWORD:-}

    echo -en "${GREEN}SENDER_EMAIL_ADDRESS$NC (default: ${UNDERLINE}irrenanstalt@${DOMAIN}${NC}): "
    read SENDER_EMAIL_ADDRESS </dev/tty
    SENDER_EMAIL_ADDRESS=${SENDER_EMAIL_ADDRESS:-irrenanstalt@${DOMAIN}}
fi

AUTH_SECRET=$(openssl rand -base64 32)
ADMIN_PASSWORD=$(openssl rand -base64 16)
POSTGRES_PASSWORD=$(openssl rand -base64 16)

cat >> .env <<EOF
POSTGRES_USER=postgres
POSTGRES_HOST=localhost
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=postgres
POSTGRES_PORT=5432

## Specify the Protocol (http or https) and the Port and end with a slash. For example: http://localhost:3000/ or https://myapp.com/
BASE_URL_PROTOCOL=${BASE_URL_PROTOCOL}
BASE_URL_HOST=${BASE_URL_HOST}
BASE_URL_PORT=${BASE_URL_PORT}

PASSWORT_REQUIREMENTS_REGEX=^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.@\$!%*?&]).{8,}$
PASSWORT_REQUIREMENTS_MESSAGE=Das Passwort muss<ul class='list-disc ml-5'><li>mindestens 8 Zeichen lang sein</li><li>einen Kleinbuchstaben enthalten</li><li>einen Großbuchstaben enthalten</li><li>eine Zahl enthalten</li><li>ein Sonderzeichen enthalten</li></ul>

## More characters are better. You can change this later. 
## Generate a random password for production with \`openssl rand -base64 32\`
ADMIN_PASSWORD=${ADMIN_PASSWORD}
ADMIN_EMAIL=${ADMIN_EMAIL}
## You can also specify a fullname if you want.
## The default fullname is "Administrator".
ADMIN_FULLNAME=${ADMIN_FULLNAME}

SUPPORT_MAIL_ADDRESS=${SUPPORT_EMAIL_ADDRESS}

##
##  Email Configuration
##
SMTP_HOST=${SMTP_HOST:-smtp.beispiel.de}
SMTP_PORT=${SMTP_PORT:-465}
SMTP_USER=${SMTP_USER:-deine-email@beispiel.de}
SMTP_PASSWORD=${SMTP_PASSWORD:-dein-passwort}
SENDER_MAIL_ADDRESS=${SENDER_EMAIL_ADDRESS:-irrenanstalt@beispiel.de}

## \`openssl rand -base64 32\`
AUTH_SECRET=${AUTH_SECRET}

####################################################################
## You don't need to change anything below this line in most cases.
####################################################################
BASE_URL=\${BASE_URL_PROTOCOL}://\${BASE_URL_HOST}:\${BASE_URL_PORT}/
DATABASE_URL=postgresql://\${POSTGRES_USER}:\${POSTGRES_PASSWORD}@\${POSTGRES_HOST}:\${POSTGRES_PORT}/\${POSTGRES_DB}
EOF

echo ""
echo ""
echo -e "${GREEN}.env file generated successfully!${NC}"
echo -e "${YELLOW}Use the following credentials to log in:${NC}"
echo -e "${GREEN}ADMIN_EMAIL$NC: ${ADMIN_EMAIL}"
echo -e "${GREEN}ADMIN_PASSWORD$NC: ${ADMIN_PASSWORD}"