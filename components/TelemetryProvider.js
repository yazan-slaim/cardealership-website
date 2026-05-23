"use client";

import { useTelemetry } from "../hooks/useTelemetry";

export default function TelemetryProvider() {
  // We initialize useTelemetry without a specific carId for global page visits.
  // Individual car pages will call useTelemetry(carId) themselves to track stock views.
  useTelemetry();

  return null;
}
