const API_URL = 'http://localhost:8080';

export function createMetric(metric) {
  try {
    return fetch(`${API_URL}/api/v1/metrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
    }).then((response) => {
      if (!response.ok) {
        throw Error();
      }
      return response.json();
    });
  } catch (error) {
    throw error;
  }
}

export function getMetrics() {
  try {
    return fetch(`${API_URL}/api/v1/metrics`).then((response) =>
      response.json(),
    );
  } catch (error) {
    throw error;
  }
}

export function createReading(readings) {
  try {
    return fetch(`${API_URL}/api/v1/readings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(readings),
    }).then((response) => response.json());
  } catch (error) {
    throw error;
  }
}

export function getReadings(metricId, range, period) {
  try {
    return fetch(
      `${API_URL}/api/v1/readings?metricId=${metricId}&range=${range}&period=${period}`,
    ).then((response) => response.json());
  } catch (error) {
    throw error;
  }
}
