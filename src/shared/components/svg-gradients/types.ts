export type gradientStage = {
  offset: string,
  stopColor: string,
  stopOpacity: string,
}

export interface GradientConfig {
  stages?: gradientStage[],
  id: string,
}

export interface LinearGradientConfig extends GradientConfig {
  gradientTransform?: string;
}