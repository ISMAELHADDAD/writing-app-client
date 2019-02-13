class API {

  static getDiscussion(id) {
    return {
      id: 1,
      topicTitle: 'Deberian las motos poder utilizar el carril bus?',
      topicDescription: 'En muchas ciudades se estan planteando el permitir a las motocicletas circular por los carriles bus, y esto esta despertando mucha controversia entre personas que creen en la facilitación del uso de la motocicleta y en las que proponen la mejoria de los medios de transporte público para una reducción de vehiculos contaminantes.',
      ownerId: 1,
      private: false,
      avatarOne: {
        name: 'John Lock',
        userAssigned: 'user1234',
        opinion: 'A favor de la utilización del carril bus por las motocicletas.'
      },
      avatarTwo: {
        name: 'John Smith',
        userAssigned: 'user1234',
        opinion: 'En contra de la utilización del carril bus por las motocicletas. A favor del uso del transporte público.'
      },
      arguments: [
        {
          id: 1,
          num: 1,
          content: 'Las motos contaminan menos que los coches debido a que: pesan menos y en conseqüencia el consumo de carburante es menor, y ocupan poco espacio y eso permite que se pueda estacionar con facilidad y aportar fluidez en el tráfico. Por ejemplo, en Londres a partir de 2012, se permitió la utilización del carril bus y durante los tres primeros años se noto "una reducción en el tiempo de desplazamiento para los motociclistas y una menor emisión de dioxido de carbono".',
          from: 'one',
          publishing_datetime: '20-02-2019-UCT16:30',
          numOfComments: '3',
          rating: '4.5'
        },
        {
          id: 2,
          num: 2,
          content: 'Pero, la utilización de motocicletas en el carril bus entorpece a los autobuses y a veces perjudica la precisión en el horario de estos. Si apostamos por la mejora de los medios de transporte públicos, podremos atraer a mas personas para que se utilizen y asi reducir el numero de vehiculos y en conseqüencia disminuir la contaminación.',
          from: 'two',
          publishing_datetime: '20-02-2019-UCT16:30',
          numOfComments: '3',
          rating: '4.5'
        },
        {
          id: 3,
          num: 3,
          content: 'Las motos contaminan menos que los coches debido a que: pesan menos y en conseqüencia el consumo de carburante es menor, y ocupan poco espacio y eso permite que se pueda estacionar con facilidad y aportar fluidez en el tráfico. Por ejemplo, en Londres a partir de 2012, se permitió la utilización del carril bus y durante los tres primeros años se noto "una reducción en el tiempo de desplazamiento para los motociclistas y una menor emisión de dioxido de carbono".',
          from: 'two',
          publishing_datetime: '20-02-2019-UCT16:30',
          numOfComments: '3',
          rating: '4.5'
        },
        {
          id: 4,
          num: 4,
          content: 'Pero, la utilización de motocicletas en el carril bus entorpece a los autobuses y a veces perjudica la precisión en el horario de estos. Si apostamos por la mejora de los medios de transporte públicos, podremos atraer a mas personas para que se utilizen y asi reducir el numero de vehiculos y en conseqüencia disminuir la contaminación.',
          from: 'one',
          publishing_datetime: '20-02-2019-UCT16:30',
          numOfComments: '3',
          rating: '4.5'
        },
        {
          id:5,
          num: 5,
          content: 'Las motos contaminan menos que los coches debido a que: pesan menos y en conseqüencia el consumo de carburante es menor, y ocupan poco espacio y eso permite que se pueda estacionar con facilidad y aportar fluidez en el tráfico. Por ejemplo, en Londres a partir de 2012, se permitió la utilización del carril bus y durante los tres primeros años se noto "una reducción en el tiempo de desplazamiento para los motociclistas y una menor emisión de dioxido de carbono".',
          from: 'two',
          publishing_datetime: '20-02-2019-UCT16:30',
          numOfComments: '3',
          rating: '4.5'
        }
      ],
      pointsOfAgreement: [
        {
          content: 'Utilización del carril bus por las motos en diferentes horarios.',
          accepted: true,
          proposedFrom: 'John Locke'
        },
        {
          content: 'Mejorar transporte público.',
          accepted: false,
          proposedFrom: 'John Locke'
        }
      ],
      pointsOfDisagreement: [
        {
          content: 'Las motos contaminan menos que los coches.',
          accepted: false,
          proposedFrom: 'John Locke'
        }
      ]
    }
  }

  static getUserById(id){
    return {
      id: 1,
      name: 'user1234'
    }
  }
}

export default API
