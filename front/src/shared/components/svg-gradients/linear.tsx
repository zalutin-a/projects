import { LinearGradientConfig } from "./types"

export function SVGLinearGradient({config}: {config: LinearGradientConfig}) {
  const extendedConfig: LinearGradientConfig = {
    gradientTransform: 'rotate(90)',
    stages: [
      {offset:"0%", stopColor:"#F1EDFF", stopOpacity:"0.95"},
      {offset:"100%", stopColor:"#F3F0FF", stopOpacity:"0.13"},
    ],
    ...config
  }
  
  return (
    <>
      <defs>
        <linearGradient id={extendedConfig.id} gradientTransform={extendedConfig.gradientTransform}>
          {extendedConfig.stages.map((stage, i) => {
            return <stop key={i} {...stage}></stop>
          })}
        </linearGradient>
      </defs>
    </>
  )
}
