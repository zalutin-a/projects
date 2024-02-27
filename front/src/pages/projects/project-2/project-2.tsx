import { RoundChart } from "src/shared"


const config = {
    legend: false,
    width: 600,
    height: 600,
    startAngle:  -3 * Math.PI/4,
    endAngle: 3 * Math.PI/4,
    innerRadius: 200,
    // animationFrames: number,//15,
    // frameDelay: number,//10,
}

const data = [
  {
    name: 'option 1',
    value: 600,
    color: '#e8f598'
  },
  {
    name: 'option 2',
    value: 400,
    color: '#99d594'
  },
  {
    name: 'option 3',
    value: 200,
    color: '#d53e4f'
  },
  {
    name: 'option 4',
    value: 500,
    color: '#fc8d59'
  },
  {
    name: 'option 5',
    value: 450,
    color: '#2196f3'
  },
  {
    name: 'option 6',
    value: 300,
    color: '#9c27b0'
  }
]

export const Project2 = () => {
  return (
    <RoundChart data={data} config={config}></RoundChart>
  )
}