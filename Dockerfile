FROM node:20.11.0-alpine as build

WORKDIR /app

LABEL maintainer="ruhose73"
LABEL description="Reserve service"
LABEL version="1.0"

COPY ./package.json ./package-lock.json  ./

RUN npm config set fetch-retry-maxtimeout 600000 -g && \
    npm ci --cache .npm --prefer-offline

COPY . .

RUN npm run build

FROM node:20.11.0-alpine as production

ENV NODE_ENV=production

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build --chown=appuser:appgroup /app/node_modules ./node_modules/
COPY --from=build --chown=appuser:appgroup /app/package.json ./
COPY --from=build --chown=appuser:appgroup /app/package-lock.json ./
COPY --from=build --chown=appuser:appgroup /app/dist ./dist/

USER appuser

EXPOSE 3000

CMD ["npm", "run", "start:with-migrations"]