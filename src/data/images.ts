// Todas as imagens externas ficam centralizadas aqui para facilitar a troca.
// Cada uma passa por <SafeImage>, que exibe um fallback elegante caso a URL falhe.
const u = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMG = {
  hero: u('photo-1504674900247-0877df9cc836', 2400),
  historyMain: u('photo-1556910103-1c02745aae4d', 1200),
  historySecondary: u('photo-1507048331197-7d4ac70811cf', 900),
  historyThird: u('photo-1466637574441-749b8f19452f', 900),
  tropeiro: u('photo-1512058564366-18510be2db19', 1000),
  frangoQuiabo: u('photo-1455619452474-d2be8b1e70cd', 1000),
  costelinha: u('photo-1544025162-d76694265947', 1000),
  tutu: u('photo-1547592180-85f173990554', 1000),
  paoQueijo: u('photo-1598142982901-df8a5a2d1a0e', 1000),
  torresmo: u('photo-1529692236671-f1f6cf9683ba', 1000),
  cafe: u('photo-1495474472287-4d71bcdd2085', 1000),
  doceLeite: u('photo-1551024601-bec78aea704b', 1000),
  goiabada: u('photo-1488477181946-6428a0291777', 1000),
  suco: u('photo-1600271886742-f049cd451bba', 1000),
  lanche: u('photo-1568901346375-23c9450c58cd', 1000),
  restaurante: u('photo-1414235077428-338989a2e8c0', 1400),
  interior: u('photo-1517248135467-4c7edcad34c4', 1400),
  mesa: u('photo-1540189549336-e6e99c3679fe', 1400),
  buffet: u('photo-1555244162-803834f70033', 1400),
  fogao: u('photo-1556909114-f6e7ad7d3136', 1400),
  pratos: u('photo-1476224203421-9ac39bcb3327', 1400),
  fachada: u('photo-1559339352-11d035aa65de', 1400),
  estacionamento: u('photo-1506521781263-d8422e82f27a', 1000),
  familia: u('photo-1529543544282-ea669407fca3', 1000),
  viajante: u('photo-1469854523086-cc02fe5d8800', 1000),
}
