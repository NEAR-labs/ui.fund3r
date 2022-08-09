# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ARG NEXT_PUBLIC_NEAR_NETWORK_ENV=${NEXT_PUBLIC_NEAR_NETWORK_ENV}
ARG NEXT_PUBLIC_NEAR_DAO_CONTRACT_ID=${NEXT_PUBLIC_NEAR_DAO_CONTRACT_ID}
ARG NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
ARG NEXT_PUBLIC_SKIP_EVALUATION_APPROVAL=${NEXT_PUBLIC_SKIP_EVALUATION_APPROVAL}
ARG NEXT_PUBLIC_SKIP_ONBOARDING=${NEXT_PUBLIC_SKIP_ONBOARDING}
ARG NEXT_PUBLIC_DEMO_MODE=${NEXT_PUBLIC_DEMO_MODE}
ARG NEXT_PUBLIC_HOST_URL=${NEXT_PUBLIC_HOST_URL}
ARG NEXT_PUBLIC_BACKEND_HOST=${NEXT_PUBLIC_BACKEND_HOST}
ARG NEXT_PUBLIC_CALENDLY_URL_APPLICATION=${NEXT_PUBLIC_CALENDLY_URL_APPLICATION}
ARG NEXT_PUBLIC_CALENDLY_URL_MILESTONES=${NEXT_PUBLIC_CALENDLY_URL_MILESTONES}
ARG NEXT_PUBLIC_MOCK_API=${NEXT_PUBLIC_MOCK_API}
ARG NEXT_PUBLIC_MOCK_DELAY_GET=${NEXT_PUBLIC_MOCK_DELAY_GET}
ARG NEXT_PUBLIC_MOCK_DELAY_POST_PUT=${NEXT_PUBLIC_MOCK_DELAY_POST_PUT}
ARG NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID=${NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID}

ENV NEXT_PUBLIC_NEAR_NETWORK_ENV=${NEXT_PUBLIC_NEAR_NETWORK_ENV}
ENV NEXT_PUBLIC_NEAR_DAO_CONTRACT_ID=${NEXT_PUBLIC_NEAR_DAO_CONTRACT_ID}
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
ENV NEXT_PUBLIC_SKIP_EVALUATION_APPROVAL=${NEXT_PUBLIC_SKIP_EVALUATION_APPROVAL}
ENV NEXT_PUBLIC_SKIP_ONBOARDING=${NEXT_PUBLIC_SKIP_ONBOARDING}
ENV NEXT_PUBLIC_DEMO_MODE=${NEXT_PUBLIC_DEMO_MODE}
ENV NEXT_PUBLIC_HOST_URL=${NEXT_PUBLIC_HOST_URL}
ENV NEXT_PUBLIC_BACKEND_HOST=${NEXT_PUBLIC_BACKEND_HOST}
ENV NEXT_PUBLIC_CALENDLY_URL_APPLICATION=${NEXT_PUBLIC_CALENDLY_URL_APPLICATION}
ENV NEXT_PUBLIC_CALENDLY_URL_MILESTONES=${NEXT_PUBLIC_CALENDLY_URL_MILESTONES}
ENV NEXT_PUBLIC_MOCK_API=${NEXT_PUBLIC_MOCK_API}
ENV NEXT_PUBLIC_MOCK_DELAY_GET=${NEXT_PUBLIC_MOCK_DELAY_GET}
ENV NEXT_PUBLIC_MOCK_DELAY_POST_PUT=${NEXT_PUBLIC_MOCK_DELAY_POST_PUT}
ENV NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID=${NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID}

# create .env file with all the environment variables
RUN echo "NEXT_PUBLIC_NEAR_NETWORK_ENV=${NEXT_PUBLIC_NEAR_NETWORK_ENV}" > .env
RUN echo "NEXT_PUBLIC_NEAR_DAO_CONTRACT_ID=${NEXT_PUBLIC_NEAR_DAO_CONTRACT_ID}" >> .env
RUN echo "NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}" >> .env
RUN echo "NEXT_PUBLIC_SKIP_EVALUATION_APPROVAL=${NEXT_PUBLIC_SKIP_EVALUATION_APPROVAL}" >> .env
RUN echo "NEXT_PUBLIC_SKIP_ONBOARDING=${NEXT_PUBLIC_SKIP_ONBOARDING}" >> .env
RUN echo "NEXT_PUBLIC_DEMO_MODE=${NEXT_PUBLIC_DEMO_MODE}" >> .env
RUN echo "NEXT_PUBLIC_HOST_URL=${NEXT_PUBLIC_HOST_URL}" >> .env
RUN echo "NEXT_PUBLIC_BACKEND_HOST=${NEXT_PUBLIC_BACKEND_HOST}" >> .env
RUN echo "NEXT_PUBLIC_CALENDLY_URL_APPLICATION=${NEXT_PUBLIC_CALENDLY_URL_APPLICATION}" >> .env
RUN echo "NEXT_PUBLIC_CALENDLY_URL_MILESTONES=${NEXT_PUBLIC_CALENDLY_URL_MILESTONES}" >> .env
RUN echo "NEXT_PUBLIC_MOCK_API=${NEXT_PUBLIC_MOCK_API}" >> .env
RUN echo "NEXT_PUBLIC_MOCK_DELAY_GET=${NEXT_PUBLIC_MOCK_DELAY_GET}" >> .env
RUN echo "NEXT_PUBLIC_MOCK_DELAY_POST_PUT=${NEXT_PUBLIC_MOCK_DELAY_POST_PUT}" >> .env
RUN echo "NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID=${NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID}" >> .env

RUN cat .env

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
