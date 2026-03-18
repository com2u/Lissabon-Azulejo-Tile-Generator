# Lissabon - Portuguese Azulejo Tile Generator
# Dockerfile for containerized deployment

FROM python:3.11-alpine

# Labels
LABEL maintainer="Lissabon Project"
LABEL description="Portuguese Azulejo Tile Generator - Web Application"

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user for security
RUN addgroup -g 1000 -S appgroup && \
    adduser -u 1000 -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Copy application files
COPY --chown=appuser:appgroup index.html ./
COPY --chown=appuser:appgroup styles.css ./
COPY --chown=appuser:appgroup favicon.svg ./

# Copy directories
COPY --chown=appuser:appgroup js/ ./js/
COPY --chown=appuser:appgroup css/ ./css/
COPY --chown=appuser:appgroup tiles/ ./tiles/

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Run the application
CMD ["python3", "-m", "http.server", "8080", "--bind", "0.0.0.0"]
