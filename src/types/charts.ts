/**
 * Typed wrappers for Recharts callback props.
 * Recharts ships with loose typings; these narrow the shapes we actually use.
 */

export interface RechartsTooltipPayloadItem {
  dataKey: string;
  name?: string;
  value: number | string | null;
  color?: string;
  fill?: string;
  stroke?: string;
  unit?: string;
  payload?: Record<string, unknown>;
}

export interface RechartsTooltipProps {
  active?: boolean;
  payload?: RechartsTooltipPayloadItem[];
  label?: string | number;
}
