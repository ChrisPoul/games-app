export default function Food() {
  let positionX = 10
  let positionY = 20

  return (
    <div>
      <button
        className="bg-red-500 p-4 rounded hover:bg-red-700 hover:text-white"
        style={{ position: "absolute", top: positionX + "em", left: positionY + "em" }}
      ></button>
    </div >
  )
}