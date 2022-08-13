import { useEffect, useState } from 'react'
import WallForm from './component/WallForm'
import Paint from './logo/paint-logo.png'
import './styles.css'
/*Importando a biblioteca para usar na aplicação */

/*componente principal */
const App = () => {
  /*wall1 é a variável, setwall é a função que recebe o state atual e muda esse valor 
  o usestate começa vazio
  */
  const [wall1, setWall1] = useState({})
  const [wall2, setWall2] = useState({})
  const [wall3, setWall3] = useState({})
  const [wall4, setWall4] = useState({})
  const [resultMessage, setResultMessage] = useState('')

  /* 
  basicamente substitui os ciclos de vida do componente, mas não pode ser comparado a eles
  executa toda vez que a variável alterar seu valor dentro do input, envia um alerta
  caso a informação inputada não esteja de acordo com a regra de negócio imposto pelo sistema,
  se tiver tudo ok com a informação digitada, a função é recarregada e o setmessage retorna vazio.

  */
  useEffect(() => {
    setResultMessage('')
  }, [wall1, wall2, wall3, wall4])

  /*previnindo o comportamento padrão do form, com o evento de submit
   
  */

  const handleSubmit = event => {
    event.preventDefault()

    /*declarando a variável para fazer os cálculos das paredes recebendo os valores de wallform, que é atualizado pelo state
     */

    const total =
      wall1.width * wall1.height +
      wall2.width * wall2.height +
      wall3.width * wall3.height +
      wall4.width * wall4.height

    /*
      declarando a varíavel para receber os valores das portas e janelas e informando que
      as portas é igual a quantidade de porta informada pelo usuário x 1,52(área máxima da porta)

      + + quando um valor é texto o +(colado) converte ele para num
       */

    const doors = +wall1.doors + +wall2.doors + +wall3.doors + +wall4.doors
    const doorsArea = doors * (0.8 * 1.9)

    const windows =
      +wall1.windows + +wall2.windows + +wall3.windows + +wall4.windows
    const windowsArea = windows * (2 * 1.2)

    /*
    condicional caso o usuário envie os campos de altura e largura vazio.
    caso a area de portas e janelas ultrapassem 50% do total das paredes
    */
    if (total === 0) {
      setResultMessage('Insira valores válidos')
      return
    } else if (((doorsArea + windowsArea) * 100) / total > 50) {
      setResultMessage(
        'A área total das paredes deve representar menos de 50% da área total de janelas e portas'
      )
      return
    }

    /*
    declaração da area total, com ou sem, portas e janelas
    */
    let totalArea = total - (doorsArea + windowsArea)

    /*
    declaração json(objeto do js para transitar um conjuto de informações de forma universal) das variações nos tamanhos de tintas iniciando com 0
    */
    const bucketsCount = {
      18: 0,
      3.6: 0,
      2.5: 0,
      0.5: 0
    }

    /*
    criando a rotina para as sugestões de latas de tinta com estrutura de repetição
    para fazer os cálculos de sugestão
    */

    while (totalArea > 0) {
      // 18l
      if (totalArea / (18 * 5) >= 1) {
        const buckets = Math.floor(totalArea / (18 * 5))

        bucketsCount['18'] = bucketsCount['18'] + buckets

        totalArea = totalArea - buckets * (18 * 5)
      }
      // 3.6l
      else if (totalArea / (3.6 * 5) >= 1) {
        const buckets = Math.floor(totalArea / (3.6 * 5))

        bucketsCount['3.6'] = bucketsCount['3.6'] + buckets

        totalArea = totalArea - buckets * (3.6 * 5)
      }
      // 2.5l
      else if (totalArea / (2.5 * 5) >= 1) {
        const buckets = Math.floor(totalArea / (2.5 * 5))

        bucketsCount['2.5'] = bucketsCount['2.5'] + buckets

        totalArea = totalArea - buckets * (2.5 * 5)
      }
      // 0.5l
      else if (totalArea / (0.5 * 5) >= 1) {
        const buckets = Math.floor(totalArea / (0.5 * 5))

        bucketsCount['0.5'] = bucketsCount['0.5'] + buckets

        totalArea = totalArea - buckets * (0.5 * 5)
      }
      // sobra quando cair a sobra é porque acabou o calculo, salva o que foi calculado até então
      else if (totalArea <= 0.5 * 5) {
        bucketsCount['0.5'] = bucketsCount['0.5'] + 1
        totalArea = 0
      } else if (totalArea <= 2.5 * 5) {
        bucketsCount['2.5'] = bucketsCount['2.5'] + 1
        totalArea = 0
      } else if (totalArea <= 3.6 * 5) {
        bucketsCount['3.6'] = bucketsCount['3.6'] + 1
        totalArea = 0
      } else if (totalArea <= 18 * 5) {
        bucketsCount['18'] = bucketsCount['3.6'] + 1
        totalArea = 0
      }
    }

    /*
    Interpolando as sugestões dos valores de latas de tinta para o usuário
     */
    const message =
      'Serão necessárias: ' +
      (!!bucketsCount[18]
        ? `${
            bucketsCount[18] > 1
              ? `${bucketsCount[18]} latas`
              : `${bucketsCount[18]} lata`
          } de 18 litros`
        : '') +
      (!!bucketsCount[3.6]
        ? `${!!bucketsCount[18] ? ', ' : ''} ${
            bucketsCount[3.6] > 1
              ? `${bucketsCount[3.6]} latas`
              : `${bucketsCount[3.6]} lata`
          } de 3,6 litros`
        : '') +
      (!!bucketsCount[2.5]
        ? `${!!bucketsCount[18] || !!bucketsCount[3.6] ? ', ' : ''} ${
            bucketsCount[2.5] > 1
              ? `${bucketsCount[2.5]} latas`
              : `${bucketsCount[2.5]} lata`
          } de 2,5 litros`
        : '') +
      (!!bucketsCount[0.5]
        ? `${
            !!bucketsCount[18] || !!bucketsCount[3.6] || !!bucketsCount[2.5]
              ? ' e '
              : ''
          } ${
            bucketsCount[0.5] > 1
              ? `${bucketsCount[0.5]} latas`
              : `${bucketsCount[0.5]} lata`
          } de 0,5 litro`
        : '') +
      '.'

    setResultMessage(message)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="message">
          <img id="logo-paint" src={Paint} />
          <h1>Não perca mais tempo na hora de pintar seu quarto!</h1>
          <br />
          <p>
            Use o Paint wall e saiba exatamente quantas latas de tinta você deve
            comprar para as medidas exatas do seu cômodo. <br />
            <br />
            Insira as medidas da parade:
          </p>
          <p className="information"> Apenas números</p>
        </div>
        <div className="form-content">
          <WallForm changeState={setWall1} label="Parede 1" />
          <WallForm changeState={setWall2} label="Parede 2" />
          <WallForm changeState={setWall3} label="Parede 3" />
          <WallForm changeState={setWall4} label="Parede 4" />
        </div>
        <button className="submit-button">Calcular</button>

        <h1 className="result">Resultado:</h1>
        {resultMessage && <p>{resultMessage}</p>}
      </form>
    </div>
  )
}

export default App
