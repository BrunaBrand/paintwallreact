import { useEffect, useState } from 'react'

const WallForm = ({ changeState, label }) => {
  const [wall, setWall] = useState({
    width: '',
    height: '',
    windows: '',
    doors: ''
  })

  useEffect(() => {
    changeState(wall)
  }, [changeState, wall])

  return (
    <div className="wall-form">
      <small>
        <b>{label}</b>
      </small>
      <div className="form-controll">
        <div className="full-width">
          <input
            type="number"
            placeholder="Largura"
            value={wall.width}
            onChange={event => {
              setWall(prev => ({
                ...prev,
                width: event.target.value
              }))
            }}
          />
        </div>
      </div>
      <div className="form-controll">
        <div className="full-width">
          <input
            type="number"
            placeholder="Altura"
            value={wall.height}
            onChange={event => {
              setWall(prev => ({
                ...prev,
                height: event.target.value
              }))
            }}
          />
        </div>
      </div>
      <div className="form-controll">
        <input
          type="number"
          placeholder="portas"
          value={wall.doors}
          onChange={event => {
            setWall(prev => ({
              ...prev,
              doors: event.target.value
            }))
          }}
        />
        <input
          type="number"
          placeholder="Janelas"
          value={wall.windows}
          onChange={event => {
            setWall(prev => ({
              ...prev,
              windows: event.target.value
            }))
          }}
        />
      </div>
      {!!wall.height.length &&
        !!wall.width.length &&
        (wall.width * wall.height > 50 || wall.width * wall.height < 1) && (
          <p className="error">
            A área deve ser maior que 1m² e menor que 50m².
          </p>
        )}
    </div>
  )
}

export default WallForm
