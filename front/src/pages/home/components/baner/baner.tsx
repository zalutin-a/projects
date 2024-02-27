import { Button, HoverPopover, Icon } from "src/shared";


export function Baner() {
  const clickHandler = () => {
    console.log('Click')
  }
  
  return (
    <div className="flex flex-col max-w-4xl w-full pt-10">
      <div className="w-full flex items-center flex-col mt-10 md:flex-row-reverse md:justify-between md:items-start">
        <img
          src="/images/avatar.jpg"
          className="object-cover shrink-0 w-44 sm:w-52 h-44 sm:h-52 rounded-full"
        />
        <div className="mt-8 text-center max-w-md md:text-left md:mt-0">
          <h1>Hi, I am Andrii, Creative Technologist</h1>
          <p className="adaptive-col-item_20">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
        </div>
      </div>
      <div className="flex justify-center md:justify-start adaptive-col-item_36">
        <Button clickHandler={clickHandler} color="red-400">
          <Icon type='users' size={5} color='zinc-100'></Icon>
          <span className="text-white ml-3">Find More</span>
        </Button>
      </div>
    </div>
  )
}