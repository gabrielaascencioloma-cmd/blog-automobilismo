import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "correia-dentada-quando-trocar",
    title: "Correia dentada: quando trocar e o que acontece se quebrar",
    excerpt:
      "A correia dentada é uma das peças mais críticas do carro — e quando quebra, o estrago pode custar R$ 5.000 ou mais. Saiba quando trocar e como não ser pego de surpresa.",
    category: "manutencao" as const,
    contentHtml: `<p>Se tem uma peça que você nunca pode ignorar no carro, essa peça é a <strong>correia dentada</strong>. Ela é simples, parece uma tira de borracha com dentes, custa entre R$ 150 e R$ 400 — mas quando quebra na hora errada, o prejuízo pode chegar a R$ 5.000 ou mais. E sem aviso prévio.</p>

<h2>O que faz a correia dentada?</h2>

<p>A correia dentada sincroniza o movimento do virabrequim (parte de baixo do motor) com as válvulas do cabeçote (parte de cima). Ela garante que a abertura e o fechamento das válvulas aconteça no momento exato, milissegundo a milissegundo, enquanto o motor está rodando.</p>

<p>Sem essa sincronia, as válvulas e os pistões colidem. Em motores chamados "de interferência" — que são a maioria dos motores modernos — essa colisão dobra as válvulas, danifica o cabeçote e pode fundir o motor por completo.</p>

<div data-callout data-title="⚠️ Atenção">
Nem todo motor quebra quando a correia arrebenta. Motores "não-interferentes" param, mas não fundem. Verifique com sua concessionária ou mecânico qual é o tipo do seu motor.
</div>

<h2>Quando trocar a correia dentada?</h2>

<p>Cada fabricante define um intervalo. Não existe uma regra universal, mas há faixas comuns:</p>

<ul>
<li>Motores 1.0 e 1.4 (Gol, Palio, HB20 antigo): entre <strong>60.000 e 80.000 km</strong> ou 4 anos — o que vier primeiro</li>
<li>Motores 1.6 e 1.8 (Civic antigo, Corolla, Focus): entre <strong>80.000 e 100.000 km</strong></li>
<li>Motores turbinados e modernos (1.0 turbo, 1.3 turbo): entre <strong>80.000 e 120.000 km</strong> — confirme no manual</li>
</ul>

<p>O ponto mais importante: sempre consulte o <strong>manual do proprietário</strong> do seu carro. O intervalo está na seção de manutenção preventiva. Se você comprou o carro usado e não tem o histórico de manutenção, troque sem hesitar — o risco não vale a pena.</p>

<h2>O kit completo — não só a correia</h2>

<p>Quando você troca a correia, o certo é trocar junto o <strong>kit completo de distribuição</strong>:</p>

<ul>
<li>Correia dentada</li>
<li>Tensor (mantém a tensão correta da correia)</li>
<li>Rolete (guia o percurso da correia)</li>
<li>Bomba d'água (na maioria dos motores, é movida pela mesma correia)</li>
</ul>

<p>Parece caro — e é, em torno de R$ 800 a R$ 1.800 com mão de obra. Mas sai muito mais barato do que precisar de um cabeçote novo.</p>

<h2>Sinais de que a correia pode estar com problema</h2>

<p>A correia dentada raramente avisa antes de quebrar. Mas há alguns sinais que pedem atenção:</p>

<ul>
<li>Motor faz um <strong>ruído de chiado ou crepitação</strong> na região da tampa da correia (parte frontal do motor)</li>
<li><strong>Óleo vazando pela tampa da correia</strong> — o óleo deteriora a borracha</li>
<li>Carro com <strong>mais de 60.000 km sem registro de troca</strong> da correia</li>
<li><strong>Dificuldade para dar partida</strong> em carros que normalmente ligam bem</li>
</ul>

<h2>Quanto custa trocar a correia dentada?</h2>

<p>Os preços variam bastante por região e modelo, mas como referência:</p>

<ul>
<li><strong>Kit de peças:</strong> R$ 250 a R$ 700 (dependendo da marca e do motor)</li>
<li><strong>Mão de obra:</strong> R$ 300 a R$ 800 (motores mais complexos custam mais)</li>
<li><strong>Total médio:</strong> R$ 600 a R$ 1.500</li>
</ul>

<p>Comparado com um motor fundido — que pode custar R$ 3.000 a R$ 8.000 para reconstruir ou substituir — é um investimento pequeno.</p>

<h2>Vale a pena adiar?</h2>

<p>Não. Essa é uma das poucas manutenções onde o custo de adiar é muito maior do que o custo de fazer. Se seu carro está perto do intervalo de troca e você tem viagens longas ou usa o carro diariamente, a correia dentada precisa ser prioridade número um na sua próxima revisão.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-12"),
  },

  {
    slug: "motor-de-arranque-com-defeito-sintomas-e-custo",
    title: "Motor de arranque com defeito: sintomas, causa e quanto custa",
    excerpt:
      "Aquele barulho de 'clac' seco ao tentar dar partida pode ser o motor de arranque pedindo socorro. Veja os sinais de alerta e o que fazer antes de ficar parado na rua.",
    category: "manutencao" as const,
    contentHtml: `<p>Você gira a chave, aperta o botão — e nada. Ou pior: ouve um barulho seco de "clac" que repete, mas o motor não pega. Essa situação tem um responsável na maioria das vezes: o <strong>motor de arranque</strong>.</p>

<p>É uma peça que pouca gente pensa até ela falhar. Mas quando falha, você fica na mão — literalmente.</p>

<h2>O que é o motor de arranque?</h2>

<p>O motor de arranque (também chamado de <strong>starter</strong> ou <strong>motor de partida</strong>) é um pequeno motor elétrico responsável por dar o primeiro giro no motor a combustão. Sem ele, o motor simplesmente não pega.</p>

<p>Quando você gira a chave ou aperta o botão de partida, ele recebe corrente da bateria, aciona um pinhão que engata no volante do motor e faz o motor girar rápido o suficiente para que a combustão aconteça. Em menos de um segundo, o trabalho dele já terminou.</p>

<h2>Sinais de que o arranque está falhando</h2>

<p>O motor de arranque raramente quebra do dia para a noite. Ele avisa. Os sinais mais comuns são:</p>

<ul>
<li><strong>Barulho de "clac" seco ao girar a chave</strong> — é o solenoide acionando mas o motor de arranque não girando</li>
<li><strong>Carro demora mais para pegar</strong> do que antes, especialmente de manhã</li>
<li><strong>Motor de arranque gira devagar</strong>, como se a bateria estivesse fraca (mesmo com a bateria boa)</li>
<li><strong>Rangido ou chiado</strong> durante a partida — o pinhão pode estar desgastado</li>
<li><strong>Partida intermitente</strong> — às vezes funciona, às vezes não</li>
</ul>

<div data-callout data-title="Bateria ou arranque?">
Confundir os dois é comum. Se o carro liga com cabo (ajuda de outro veículo), o problema é provavelmente a bateria. Se nem com cabo funciona — ou se a bateria está boa mas a partida é lenta — o arranque é o suspeito principal.
</div>

<h2>O que causa a falha no motor de arranque?</h2>

<p>O motor de arranque é robusto, mas tem partes que se desgastam com o tempo:</p>

<ul>
<li><strong>Escovas de carbono gastas</strong> — são os contatos internos do motor elétrico</li>
<li><strong>Solenoide com defeito</strong> — o componente que aciona o pinhão e fecha o circuito elétrico</li>
<li><strong>Pinhão desgastado</strong> — o dente que engata no volante do motor</li>
<li><strong>Corrente excessiva</strong> — bateria que nunca carregou direito pode ter queimado o arranque ao longo do tempo</li>
</ul>

<h2>Quanto custa consertar?</h2>

<p>Aqui existe uma escolha importante a fazer:</p>

<ul>
<li><strong>Retífica do motor de arranque:</strong> R$ 150 a R$ 350. Troca as escovas, o solenoide e limpa o pinhão. Funciona bem se o motor ainda estiver bom por dentro.</li>
<li><strong>Troca por motor novo ou remanufaturado:</strong> R$ 400 a R$ 900 (peça) + R$ 100 a R$ 200 (mão de obra). Mais seguro para carros que dependem muito do carro.</li>
</ul>

<p>Para carros com mais de 120.000 km, a troca completa costuma valer mais do que a retífica.</p>

<h2>O que fazer se o carro não pegou?</h2>

<p>Se o carro não ligou e você está na rua, algumas opções antes de chamar o guincho:</p>

<ul>
<li><strong>Teste com o cabo de bateria</strong> de outro carro — descarta a bateria como causa</li>
<li><strong>Bata levemente no motor de arranque</strong> com uma chave de boca (ele fica na parte de baixo do motor) — às vezes destrava uma escova emperrada temporariamente</li>
<li>Se o carro for manual e estiver numa descida, <strong>empurre e engate segunda</strong> — isso pode ligar sem usar o arranque</li>
</ul>

<p>Essas são soluções de emergência. O correto é levar ao mecânico para um diagnóstico.</p>

<h2>Quanto tempo dura um motor de arranque?</h2>

<p>Em condições normais, <strong>100.000 a 150.000 km</strong> ou mais de 10 anos. Mas carros usados em trânsito pesado (que param e partem muitas vezes por dia) desgastam mais rápido. Se o seu carro tem mais de 10 anos e nunca fez esse serviço, vale pedir para o mecânico verificar nas próximas revisões.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-12"),
  },

  {
    slug: "pneu-de-moto-hora-certa-de-trocar",
    title: "Pneu de moto: como saber a hora certa de trocar (antes de ser tarde)",
    excerpt:
      "O pneu da moto aguenta mais do que parece — até o dia que não aguenta mais. Veja como identificar o desgaste correto e evitar um acidente causado por uma borracha vencida.",
    category: "manutencao" as const,
    contentHtml: `<p>Num carro, um pneu ruim é perigoso. Numa moto, um pneu ruim pode ser fatal. Com apenas dois pontos de contato com o asfalto, cada pneu carrega literalmente a sua vida. E mesmo assim, o pneu de moto costuma ser negligenciado até dar um sinal grave de desgaste.</p>

<p>Este guia vai te ajudar a identificar o momento certo de trocar — sem gastar antes do necessário e sem esperar mais do que devia.</p>

<h2>A diferença entre pneu dianteiro e traseiro</h2>

<p>Os pneus de uma moto trabalham de formas muito diferentes. O <strong>pneu traseiro</strong> recebe toda a tração e desgasta muito mais rápido — em média, você vai trocar dois ou três traseiros para cada dianteiro. O <strong>pneu dianteiro</strong> é responsável pela frenagem e pela estabilidade na curva — e quando ele falha, o resultado costuma ser uma queda sem chance de reação.</p>

<h2>Indicadores de desgaste: os sinais que você precisa ver</h2>

<h3>1. TWI (Tread Wear Indicator)</h3>

<p>Todo pneu de moto tem embutido nas canaletas um indicador de desgaste chamado <strong>TWI</strong>. Ele fica em um ponto mais alto dentro do sulco da borracha. Quando a superfície do pneu chega na altura do TWI, o pneu está no limite e precisa ser trocado imediatamente.</p>

<p>Você encontra a marcação "TWI" no flanco do pneu — ela aponta para onde fica o indicador dentro da canaleta.</p>

<h3>2. Pneu "careca" no centro</h3>

<p>Em motos de uso urbano, que andam quase sempre em linha reta, o desgaste concentra no centro do pneu. A borracha fica plana, perde o perfil arredondado. Isso parece inofensivo, mas na hora de fazer uma curva, a moto demora mais para inclinar e a aderência cai bastante.</p>

<div data-callout data-title="Regra prática">
Se você olhar o pneu de frente e ele parecer "quadrado" em vez de redondo, já passou do ponto ideal de troca.
</div>

<h3>3. Profundidade da canaleta</h3>

<p>Com uma régua ou paquímetro, você consegue medir a profundidade dos sulcos:</p>

<ul>
<li><strong>Acima de 3 mm:</strong> bom estado</li>
<li><strong>Entre 1,5 e 3 mm:</strong> atenção, avalie a troca</li>
<li><strong>Abaixo de 1,5 mm:</strong> troque o quanto antes — não use em chuva</li>
</ul>

<h3>4. Rachaduras no flanco</h3>

<p>Borracha envelhecida racha. Mesmo que o desenho ainda pareça bom, pneus com rachaduras no flanco (a parte lateral) perderam elasticidade e estão sujeitos a estouros, especialmente com calor ou em manobras de curva.</p>

<h3>5. Data de fabricação</h3>

<p>Todo pneu tem o ano de fabricação gravado na lateral: são 4 números dentro de uma elipse. Os dois primeiros indicam a semana e os dois últimos o ano. Exemplo: <strong>2324</strong> = 23ª semana de 2024.</p>

<p>Pneus com mais de <strong>5 anos</strong> precisam ser avaliados por um borracheiro, independente do estado visual. Com mais de <strong>7 anos</strong>, troque sem hesitar — a borracha envelhece internamente mesmo sem uso.</p>

<h2>Qual a vida útil de um pneu de moto?</h2>

<ul>
<li><strong>Motos de baixa cilindrada (até 160 cc) urbanas:</strong> traseiro 8.000 a 12.000 km; dianteiro 15.000 a 20.000 km</li>
<li><strong>Motos médias (250 a 400 cc):</strong> traseiro 12.000 a 18.000 km</li>
<li><strong>Motos grandes (acima de 600 cc):</strong> traseiro 10.000 a 16.000 km dependendo do perfil de uso</li>
<li><strong>Motoboys e uso profissional intenso:</strong> reduza todas as estimativas pela metade</li>
</ul>

<h2>Quanto custa trocar o pneu de moto?</h2>

<ul>
<li><strong>Pneu dianteiro (peça):</strong> R$ 120 a R$ 400</li>
<li><strong>Pneu traseiro (peça):</strong> R$ 150 a R$ 500</li>
<li><strong>Montagem e balanceamento:</strong> R$ 40 a R$ 80 por pneu</li>
</ul>

<p>Vale investir em marcas confiáveis (Pirelli, Michelin, Bridgestone, Metzeler). O pneu barato pode custar menos na loja e muito mais na estrada.</p>

<h2>Antes de sair calibre o pneu</h2>

<p>Pneu bem calibrado dura mais e oferece mais aderência. Verifique a pressão pelo menos uma vez por semana — a especificação correta está no manual da moto ou numa plaquinha no chassi. Nunca calibre com o pneu quente (recém rodado): a pressão aumenta com o calor e a leitura fica errada.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-12"),
  },

  {
    slug: "pastilha-de-freio-vida-util-e-quando-trocar",
    title: "Pastilha de freio: vida útil, sinais de desgaste e quando trocar",
    excerpt:
      "Freio rangendo, pedal mole, distância de parada maior? Pode ser a pastilha pedindo troca. Saiba quanto dura, quanto custa e o que acontece se você ignorar os sinais.",
    category: "manutencao" as const,
    contentHtml: `<p>Você aperta o freio e ouve um rangido. Ou o pedal parece mais fundo do que antes. Ou o carro está demorando um pouco mais para parar. São sinais que a maioria dos motoristas ignora por dias, semanas — às vezes meses. E é exatamente onde mora o perigo.</p>

<p>A <strong>pastilha de freio</strong> é uma peça de segurança. Quando ela falha, não é o carro que para — é você que para de controlar o carro.</p>

<h2>Como funciona a pastilha de freio?</h2>

<p>No freio a disco (utilizado na maioria dos carros modernos no eixo dianteiro e em muitos no traseiro), a pastilha é o material de atrito que pressiona o disco quando você pisa no pedal. É essa fricção que transforma a energia cinética do carro em calor, desacelerando o veículo.</p>

<p>Com o tempo e o uso, o material de atrito da pastilha se desgasta. Quando ele acaba, o metal do suporte da pastilha começa a raspar direto no disco — e aí o problema deixa de ser a pastilha e passa a ser o disco, que custa muito mais para trocar.</p>

<h2>Sinais de que a pastilha está no limite</h2>

<h3>Rangido ao frear</h3>

<p>A maioria das pastilhas modernas tem um <strong>sensor de desgaste</strong> embutido — uma pequena lâmina metálica que começa a roçar no disco quando a pastilha chega ao limite. O resultado é um rangido agudo ao frear. É literalmente um alarme que a peça instalou para avisar você.</p>

<h3>Luz de aviso no painel</h3>

<p>Muitos carros dos últimos 10 anos têm sensor elétrico de desgaste de pastilha. Quando acende a luz de freio no painel (diferente da luz do freio de mão), verifique as pastilhas.</p>

<h3>Pedal mais fundo ou esponjoso</h3>

<p>Se você precisa pisar mais fundo para ter a mesma resposta de frenagem, pode ser pastilha desgastada — ou problema no fluido de freio. Os dois merecem atenção imediata.</p>

<h3>Vibração ao frear</h3>

<p>Vibração no volante ou no pedal durante a frenagem geralmente indica que o disco está empenado, o que pode acontecer quando a pastilha é usada além do limite e o metal raspa direto.</p>

<div data-callout data-title="Não ignore o rangido">
Rangido ao frear = pastilha no limite. Você tem poucos dias antes de começar a danificar o disco. Um disco novo custa de 3 a 5 vezes mais que uma pastilha.
</div>

<h2>Quanto dura uma pastilha de freio?</h2>

<p>Depende muito do estilo de direção e do uso urbano ou rodoviário:</p>

<ul>
<li><strong>Uso urbano moderado:</strong> 30.000 a 40.000 km</li>
<li><strong>Uso urbano intenso (muito trânsito, muitas paradas):</strong> 20.000 a 30.000 km</li>
<li><strong>Uso rodoviário:</strong> pode passar de 50.000 km</li>
<li><strong>Carros pesados ou com muito peso extra:</strong> desgasta mais rápido</li>
</ul>

<p>Pastilha dianteira sempre dura menos que a traseira — ela absorve cerca de 70% da força de frenagem.</p>

<h2>Pastilha com ou sem sensor?</h2>

<p>Ao comprar pastilha nova, você vai encontrar dois tipos:</p>

<ul>
<li><strong>Com sensor de desgaste:</strong> tem a lâmina de aviso. Custa um pouco mais, mas avisa quando está no limite</li>
<li><strong>Sem sensor:</strong> mais barata, mas você precisa verificar visualmente durante as revisões</li>
</ul>

<p>Para uso urbano cotidiano, vale pagar um pouco mais pela pastilha com sensor — ela literalmente grita antes de causar dano.</p>

<h2>Quanto custa trocar a pastilha?</h2>

<ul>
<li><strong>Par de pastilhas dianteiras (peças):</strong> R$ 60 a R$ 250 (dependendo da marca e do carro)</li>
<li><strong>Mão de obra (eixo dianteiro):</strong> R$ 80 a R$ 150</li>
<li><strong>Kit completo (4 pastilhas):</strong> R$ 200 a R$ 600 com mão de obra</li>
</ul>

<p>Se o disco também estiver desgastado, add mais R$ 200 a R$ 500 por disco. Por isso compensa trocar a pastilha no tempo certo.</p>

<h2>Preciso trocar os dois lados ao mesmo tempo?</h2>

<p>Sim. Sempre troque as pastilhas em par (eixo dianteiro ou eixo traseiro completo). Pastilhas com desgastes diferentes nos dois lados causam frenagem assimétrica — o carro "puxa" para um lado ao frear, o que é perigoso e desgasta o pneu irregularmente.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-12"),
  },

  {
    slug: "bateria-de-carro-fraca-como-testar-e-quando-trocar",
    title: "Bateria de carro fraca: como testar e quando é hora de trocar",
    excerpt:
      "Carro que demora para ligar de manhã, faróis que piscam, travas elétricas lentas — são sinais clássicos de bateria fraca. Veja como testar em casa e quando vale trocar.",
    category: "manutencao" as const,
    contentHtml: `<p>Todo motorista já passou por isso: uma manhã fria, pressa para sair, e o carro demora um pouco mais para pegar. Ou então os faróis parecem mais fracos à noite. Ou o ar-condicionado faz o motor engasgar um pouco quando liga. São sintomas que a maioria das pessoas atribui ao frio, ao calor, ou ao carro "sendo esquisito".</p>

<p>Na maior parte das vezes, o culpado é a <strong>bateria</strong>.</p>

<h2>Quanto tempo dura uma bateria de carro?</h2>

<p>Em condições normais, uma bateria convencional de chumbo-ácido dura de <strong>3 a 5 anos</strong>. Baterias de maior qualidade podem passar de 5 anos, mas o ideal é começar a monitorar depois dos 3 anos — especialmente em climas quentes, que aceleram o envelhecimento da bateria.</p>

<p>O calor é inimigo da bateria. Em cidades como São Paulo, Rio de Janeiro e Nordeste, baterias tendem a durar menos do que o esperado.</p>

<h2>Sinais de bateria fraca</h2>

<ul>
<li><strong>Motor demora para pegar</strong> — especialmente de manhã ou após o carro ficar parado por horas</li>
<li><strong>Faróis e luz interna mais fracos</strong> quando o motor está desligado</li>
<li><strong>Faróis que piscam</strong> ao ligar o motor — a bateria não sustenta a carga</li>
<li><strong>Painel com erros aleatórios</strong> que somem depois que o carro aquece</li>
<li><strong>Sistema de som que reseta</strong> ou relógio que perde o horário frequentemente</li>
<li><strong>Ar-condicionado que engasga o motor</strong> quando liga com o carro em marcha lenta</li>
<li><strong>Bateria que precisa ser ligada com cabo</strong> com frequência</li>
</ul>

<div data-callout data-title="Bateria boa, mas descarregada">
Uma bateria que descarregou por descuido (farol aceso com o motor desligado) pode ser recarregada. Uma bateria que descarregou por envelhecimento dificilmente volta ao estado original. Ligue e observe nos dias seguintes — se descarregar de novo sem motivo aparente, é hora de trocar.
</div>

<h2>Como testar a bateria em casa</h2>

<h3>Teste visual</h3>

<p>Abra o capô e observe a bateria:</p>

<ul>
<li><strong>Carcaça inchada ou deformada:</strong> bateria danificada, troque imediatamente</li>
<li><strong>Terminais com corrosão branca ou azulada:</strong> limpe com água quente e bicarbonato. A corrosão aumenta a resistência e pode parecer bateria fraca quando o problema é só contato sujo</li>
<li><strong>Derramamento de ácido:</strong> sinal de superaquecimento ou bateria com defeito</li>
</ul>

<h3>Teste com multímetro</h3>

<p>Um multímetro simples (R$ 30 a R$ 80) faz esse teste em segundos:</p>

<ul>
<li>Com o motor desligado, meça a tensão nos terminais da bateria</li>
<li><strong>Acima de 12,4 V:</strong> bateria carregada e em bom estado</li>
<li><strong>Entre 12,0 e 12,4 V:</strong> bateria fraca, pode estar no fim</li>
<li><strong>Abaixo de 12,0 V:</strong> bateria descarregada ou com defeito</li>
</ul>

<p>Com o motor ligado, o valor deve subir para <strong>13,5 a 14,5 V</strong> — isso indica que o alternador está carregando a bateria corretamente. Se estiver abaixo, o alternador pode estar com problema.</p>

<h3>Teste de carga (no mecânico)</h3>

<p>O teste mais preciso é o <strong>teste de carga</strong>, feito com equipamento específico. Ele simula o consumo do motor de arranque e mede se a bateria aguenta. Muitas baterias mostram tensão normal em repouso mas descarregam sob carga. Peça esse teste quando a bateria estiver com mais de 3 anos.</p>

<h2>Quanto custa uma bateria nova?</h2>

<p>Os preços variam por amperagem e marca:</p>

<ul>
<li><strong>Carros pequenos (Gol, HB20, Uno):</strong> R$ 250 a R$ 450</li>
<li><strong>Carros médios (Corolla, Civic, Onix Plus):</strong> R$ 350 a R$ 600</li>
<li><strong>SUVs e caminhonetes:</strong> R$ 500 a R$ 900</li>
</ul>

<p>A instalação normalmente é gratuita quando você compra na loja. Baterias Moura, Heliar e Acdelco têm boa reputação no mercado nacional.</p>

<h2>Dicas para a bateria durar mais</h2>

<ul>
<li>Não deixe o carro parado por mais de 15 dias sem ligar — a bateria descarrega naturalmente</li>
<li>Desligue os faróis, ar-condicionado e som antes de desligar o motor</li>
<li>Evite percursos muito curtos repetidos — o alternador não tem tempo de recarregar a bateria</li>
<li>Limpe a corrosão dos terminais a cada revisão</li>
</ul>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-12"),
  },

  {
    slug: "lavagem-a-seco-passo-a-passo",
    title: "Lavagem a seco em casa: passo a passo para limpar o carro sem desperdiçar água",
    excerpt:
      "Você não precisa de mangueira nem de lava-jato para ter um carro limpo. Com os produtos certos, dá para fazer uma lavagem a seco em menos de 30 minutos em casa.",
    category: "dicas" as const,
    contentHtml: `<p>Apartamento sem garagem. Condomínio que proíbe lavar carro. Região com restrição de água. Ou simplesmente falta de tempo para ir ao lava-jato. Esses são os motivos que levaram muita gente a descobrir a <strong>lavagem a seco</strong> — e a nunca mais voltar atrás.</p>

<p>Feita corretamente, ela limpa tão bem quanto uma lavagem convencional, não risca a pintura e gasta menos de 10 minutos de trabalho efetivo.</p>

<h2>O que é lavagem a seco?</h2>

<p>Lavagem a seco é a limpeza da lataria do carro usando um <strong>produto específico em spray</strong> que encapsula as partículas de sujeira, permitindo removê-las com um pano de microfibra sem precisar de água. Não é uma solução paliativa — é uma técnica usada profissionalmente em concessionárias e detailers.</p>

<p>O nome "a seco" é um pouco enganoso: o produto pulverizado contém água e agentes tensoativos, mas em quantidade tão pequena que não corre nem escorre. A sujeira sai no pano, não no chão.</p>

<h2>O que você precisa</h2>

<ul>
<li><strong>Spray de lavagem a seco:</strong> R$ 25 a R$ 60 (Wurth, Sonax, Protelim, Meguiar's são marcas confiáveis)</li>
<li><strong>Panos de microfibra:</strong> no mínimo 4 a 6 panos limpos. Compre os mais macios que encontrar — os mais duros podem riscar. Custo: R$ 20 a R$ 60 o kit</li>
<li><strong>Aspirador de pó portátil:</strong> para o interior. Opcional para a parte externa</li>
</ul>

<p>Investimento inicial: R$ 80 a R$ 150. Dura muitas lavagens.</p>

<h2>Passo a passo da lavagem a seco</h2>

<h3>Passo 1: Avalie a sujeira</h3>

<p>Lavagem a seco funciona bem para <strong>poeira, sujeira leve e oleosidade</strong>. Para lama seca, areia grossa ou barro pesado, primeiro remova o excesso com um pano úmido ou jogue um pouco de água antes. Tentar remover abrasivos secos com microfibra é a forma mais fácil de riscar a pintura.</p>

<h3>Passo 2: Divida o carro em painéis</h3>

<p>Trabalhe de cima para baixo e de painéis em painéis: teto → capô → porta dianteira direita → traseira direita → porta-malas → traseira esquerda → dianteira esquerda. Nunca limpe o painel inteiro de uma vez — o produto seca rápido.</p>

<h3>Passo 3: Pulverize e remova</h3>

<p>Borrife o spray de lavagem a seco em um painel pequeno (cerca de 60 x 60 cm). Aguarde 5 a 10 segundos. Com um pano de microfibra limpo, remova a sujeira com movimentos retos — nunca circulares, pois círculos criam marcas de swirl (hologramas) na pintura. Use uma face do pano, depois vire e passe novamente para dar brilho.</p>

<div data-callout data-title="Regra do microfibra">
Um pano sujo é pior do que nenhum pano. Quando o pano estiver com sujeira visível, troque. Lave os panos depois separados das outras roupas, sem amaciante — o amaciante entope as fibras e elimina a capacidade de absorção.
</div>

<h3>Passo 4: Vidros e plásticos</h3>

<p>Para os vidros, use um spray específico para vidros (o de lavagem a seco pode deixar resíduo). Para plásticos externos e para-choques, o spray de lavagem a seco funciona bem, mas você também pode usar um produto de proteção de plásticos que nutre a superfície.</p>

<h3>Passo 5: Interior</h3>

<p>Para o interior, passe o aspirador primeiro. Depois limpe o painel, console e portas com um pano de microfibra levemente úmido (com água) ou um spray específico para interiores. Bancos de couro merecem produto próprio de limpeza e hidratação.</p>

<h2>O que a lavagem a seco não substitui</h2>

<p>Lavagem a seco cuida bem da limpeza de manutenção. Mas periodicamente (a cada 3 a 6 meses) o carro precisa de:</p>

<ul>
<li><strong>Lavagem completa com água</strong> para remover resíduos de produtos acumulados</li>
<li><strong>Descontaminação da pintura</strong> para remover ferrugem de freio e poeira metálica</li>
<li><strong>Encerramento ou selante</strong> para proteger a pintura</li>
</ul>

<p>Mas para o dia a dia, a lavagem a seco é mais do que suficiente — e o carro fica visivelmente melhor do que deixar acumular sujeira entre uma ida e outra ao lava-jato.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-13"),
  },

  {
    slug: "motor-do-carro-superaquecendo-o-que-fazer",
    title: "Motor superaquecendo: o que fazer (e o que nunca fazer) quando o ponteiro sobe",
    excerpt:
      "Ponteiro de temperatura subindo, vapor saindo do capô — saiba exatamente o que fazer nos próximos 30 segundos e o que nunca fazer se não quiser fundir o motor.",
    category: "alertas" as const,
    contentHtml: `<p>Você está dirigindo e percebe que o ponteiro de temperatura do motor — aquele que fica entre o "C" de frio e o "H" de quente — começa a subir. Ou pior: aparece vapor saindo de baixo do capô. O que você faz nos próximos minutos vai determinar se você vai gastar alguns reais de conserto ou vários milhares para reconstruir o motor.</p>

<p>Este é o guia de o que fazer — e o que nunca fazer — quando o motor do carro começa a superaquecer.</p>

<h2>Por que o motor superaquece?</h2>

<p>O motor a combustão gera uma quantidade enorme de calor — e precisa disso para funcionar. O sistema de arrefecimento existe para manter esse calor dentro de uma faixa segura (entre 85°C e 100°C na maioria dos motores). Quando esse sistema falha, a temperatura sobe além do limite.</p>

<p>As causas mais comuns são:</p>

<ul>
<li><strong>Nível de fluido de arrefecimento baixo</strong> — por vazamento ou por falta de manutenção</li>
<li><strong>Radiador entupido</strong> — impede a troca de calor com o ar</li>
<li><strong>Bomba d'água com defeito</strong> — deixa de circular o fluido</li>
<li><strong>Termostato travado fechado</strong> — o fluido não consegue circular</li>
<li><strong>Ventoinha com defeito</strong> — especialmente em trânsito lento, onde não há vento natural</li>
<li><strong>Correia dentada ou da bomba d'água quebrada</strong></li>
</ul>

<h2>O que fazer quando o ponteiro sobe</h2>

<h3>Situação 1: O ponteiro subiu mas ainda está na faixa amarela</h3>

<p>Desligue o ar-condicionado imediatamente — o ar-condicionado gera calor extra no motor. Ligue o <strong>aquecedor da cabine no máximo</strong> (mesmo que seja verão) — o aquecedor usa o calor do motor para aquecer o carro, funcionando como um segundo radiador e ajudando a dissipar o calor. Reduza a velocidade. Se o ponteiro continuar subindo, siga para a Situação 2.</p>

<h3>Situação 2: O ponteiro entrou na zona vermelha</h3>

<p>Pare o carro com segurança o mais rápido possível. Encoste no acostamento, estacionamento, qualquer lugar seguro. <strong>Desligue o motor</strong>. Não tente chegar em casa, na oficina ou até a próxima saída de rodovia.</p>

<div data-callout data-title="⚠️ O maior erro que você pode cometer">
Nunca abra o radiador com o motor quente. O fluido de arrefecimento está sob pressão e a temperaturas acima de 100°C. Abrir a tampa vai expulsar vapor e líquido fervente com força suficiente para causar queimaduras graves no rosto e nas mãos. Espere pelo menos 30 minutos após desligar o motor.
</div>

<h3>Situação 3: Saiu vapor do capô</h3>

<p>Pare imediatamente, desligue o motor e não abra o capô ainda. Ligue o pisca-alerta. Espere o motor esfriar por completo — no mínimo 30 a 45 minutos. Só então abra o capô e verifique o nível do reservatório de fluido de arrefecimento (não a tampa do radiador — o reservatório plástico translúcido ao lado).</p>

<h2>O que não fazer — nunca</h2>

<ul>
<li><strong>Não continue dirigindo</strong> achando que vai chegar logo. Cada quilômetro rodado com o motor superaquecido aumenta o risco de dano permanente</li>
<li><strong>Não abra a tampa do radiador</strong> com o motor quente</li>
<li><strong>Não coloque água fria em um motor quente</strong> — o choque térmico pode rachar o bloco do motor ou o cabeçote</li>
<li><strong>Não ignore a luz de temperatura</strong> achando que é defeito do painel</li>
</ul>

<h2>O que pode ter danificado</h2>

<p>Se o motor chegou a superaquecer muito, mesmo que você tenha parado na hora certa, há riscos de danos:</p>

<ul>
<li><strong>Junta do cabeçote queimada:</strong> o conserto mais comum. Custo: R$ 800 a R$ 2.500</li>
<li><strong>Cabeçote empenado:</strong> mais grave. R$ 1.500 a R$ 4.000 dependendo do motor</li>
<li><strong>Motor fundido:</strong> pistões ou bielas danificadas. R$ 3.000 a R$ 8.000 ou mais</li>
</ul>

<p>O mecânico vai identificar o nível do dano. Não tente ligar o carro para "testar" depois de um superaquecimento severo sem antes verificar o que aconteceu.</p>

<h2>Como prevenir</h2>

<ul>
<li>Verifique o nível do fluido de arrefecimento a cada 15 dias (reservatório plástico sob o capô)</li>
<li>Troque o fluido de arrefecimento a cada 2 anos ou conforme o manual</li>
<li>Mantenha a correia dentada em dia (ela move a bomba d'água)</li>
<li>Se o carro ficar parado por muito tempo em sol forte, tome cuidado ao retomar o uso imediato</li>
</ul>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-13"),
  },

  {
    slug: "autopecas-original-paralela-ou-remanufaturada",
    title: "Autopeças original, paralela ou remanufaturada: qual escolher sem perder dinheiro?",
    excerpt:
      "A diferença de preço entre peça original e paralela pode ser de 300%. Mas nem sempre a mais cara é a melhor escolha. Saiba como decidir antes de sair pela primeira loja.",
    category: "dicas" as const,
    contentHtml: `<p>Você entrou na oficina, o mecânico disse que precisa trocar uma peça e te deu três opções de preço completamente diferentes. A mais cara, a do meio e a mais barata. Qual você escolhe?</p>

<p>A resposta depende da peça, do carro e de onde essa peça vai trabalhar. Nem sempre a original é a melhor escolha — e nem sempre a paralela é um risco. Entender a diferença te economiza dinheiro e evita que você gaste mais por causa de uma escolha errada.</p>

<h2>Peça original (OEM)</h2>

<p>Peça <strong>original</strong> (também chamada de OEM — Original Equipment Manufacturer) é a mesma peça que saiu de fábrica no seu carro, produzida pelo mesmo fornecedor, com a embalagem da montadora.</p>

<p><strong>Vantagens:</strong></p>
<ul>
<li>Encaixe perfeito e especificação exata para o seu modelo</li>
<li>Garantia do fabricante</li>
<li>Desempenho documentado e testado</li>
</ul>

<p><strong>Desvantagens:</strong></p>
<ul>
<li>Custo significativamente mais alto — pode ser 2 a 4 vezes mais caro que a paralela</li>
<li>Disponibilidade menor, especialmente para carros fora de linha</li>
</ul>

<p><strong>Quando vale a pena:</strong> peças de segurança em carros novos com garantia de fábrica ainda ativa, componentes eletrônicos complexos, e quando a versão paralela tem histórico de problemas.</p>

<h2>Peça paralela (aftermarket)</h2>

<p>Peça <strong>paralela</strong> é produzida por um fabricante independente, sem autorização da montadora. Não significa necessariamente que é ruim — há paralelas de altíssima qualidade e paralelas que duram semanas.</p>

<p>O mercado de peças paralelas no Brasil é enorme e inclui marcas como LuK (embreagem), Mahle (filtros, pistões), Cofap (amortecedores), SKF (rolamentos) — algumas dessas marcas, aliás, também fornecem para as próprias montadoras.</p>

<div data-callout data-title="Paralela boa existe">
LuK, Mahle, SKF, TRW e Cofap são fabricantes de autopeças que fornecem tanto para o mercado de reposição quanto para montadoras. Uma pastilha TRW comprada em autopeças pode ser exatamente a mesma que sai de fábrica no seu carro — com outro rótulo.
</div>

<p><strong>Quando vale a pena:</strong> peças de desgaste regular (pastilhas, filtros, correias, rolamentos) de marcas reconhecidas no Brasil.</p>

<p><strong>O que evitar:</strong> peças paralelas sem marca ou procedência em sistemas críticos como freios, direção e suspensão.</p>

<h2>Peça remanufaturada</h2>

<p>Peça <strong>remanufaturada</strong> é uma peça usada que passou por um processo industrial de desmontagem, limpeza, substituição de componentes internos desgastados e reassemblagem. Quando bem feita, a peça remanufaturada tem desempenho equivalente à nova.</p>

<p>Exemplos comuns: motores de arranque, alternadores, motores de janela, compressores de ar-condicionado.</p>

<p><strong>Vantagens:</strong></p>
<ul>
<li>Custo 40% a 60% menor que a peça nova</li>
<li>Boa opção para carros antigos onde a peça original não é mais fabricada</li>
</ul>

<p><strong>Ponto de atenção:</strong> verifique se o processo de remanufatura é profissional. Empresas sérias emitem nota fiscal, oferecem garantia e detalham o que foi substituído.</p>

<h2>Como decidir na prática</h2>

<p>Use esta tabela mental:</p>

<ul>
<li><strong>Segurança direta (freio, suspensão, direção):</strong> original ou paralela de marca reconhecida. Sem economizar.</li>
<li><strong>Peças de desgaste regular (filtros, correia, pastilha):</strong> paralela de boa marca. Relação custo-benefício excelente.</li>
<li><strong>Componentes elétricos simples (motor de janela, bobina):</strong> remanufaturado de boa procedência funciona bem.</li>
<li><strong>Eletrônica de motor (módulo de injeção, sensores):</strong> original sempre que possível — a compatibilidade é crítica.</li>
</ul>

<h2>Cuidado com peça sem procedência</h2>

<p>O problema real não é paralela vs. original. O problema é a peça falsificada ou sem nenhuma rastreabilidade. Esses produtos costumam vir sem embalagem adequada, sem procedência, sem garantia — e chegam pela internet a preços que parecem bons demais.</p>

<p>Uma peça de freio paralela de marca séria tem garantia e especificação documentada. Uma peça sem nome e sem nota fiscal pode ter qualquer material por dentro.</p>

<h2>Peça mais barata nem sempre é mais cara no longo prazo</h2>

<p>Uma pastilha de freio paralela de boa marca pode durar os mesmos 30.000 km da original, custando metade. Mas uma paralela ruim pode durar 8.000 km e danificar o disco no processo — e o disco novo custa muito mais do que você economizou na pastilha.</p>

<p>Pergunte ao mecânico a procedência da peça que ele recomenda. Um bom mecânico não tem problema em explicar — e geralmente tem preferência por marcas com histórico confiável.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-13"),
  },

  {
    slug: "pneu-de-carro-hora-certa-de-trocar",
    title: "Pneu de carro: como saber a hora certa de trocar sem gastar à toa",
    excerpt:
      "Pneu careca mata — isso todo mundo sabe. Mas trocar cedo demais também joga dinheiro fora. Veja como identificar o desgaste correto, quando calibrar e quanto custa.",
    category: "manutencao" as const,
    contentHtml: `<p>Pneu é uma das peças de segurança mais importantes do carro — e uma das mais ignoradas. Em cidades com trânsito parado e asfalto ruim, o desgaste vem rápido. Mas como saber quando é de verdade hora de trocar? E quando ainda dá para usar mais um tempo sem risco?</p>

<p>Este guia te mostra como avaliar o pneu do seu carro em 5 minutos, sem precisar de equipamento especial.</p>

<h2>O limite legal e o limite real</h2>

<p>No Brasil, o CONTRAN define que pneus devem ser substituídos quando o <strong>TWI (Tread Wear Indicator)</strong> — indicador de desgaste — aparecer rente à superfície. Isso corresponde a aproximadamente <strong>1,6 mm de profundidade do sulco</strong>.</p>

<p>Mas aqui está o ponto que poucos sabem: ao chegar nesse limite, o pneu ainda está legalmente em uso, mas sua eficiência de frenagem na chuva já caiu drasticamente. Estudos mostram que um pneu com 3 mm de profundidade para num espaço muito menor do que um pneu no limite de 1,6 mm em pista molhada.</p>

<p>A recomendação técnica é trocar com <strong>2 a 3 mm</strong> — não esperar chegar no limite legal.</p>

<h2>Como verificar em casa</h2>

<h3>Método do TWI</h3>

<p>Olhe dentro dos sulcos do pneu. Você vai encontrar pequenas elevações no fundo da canaleta — são os indicadores de desgaste (TWI). Quando a superfície do pneu chega na mesma altura dessas elevações, está no limite. A sigla "TWI" no flanco do pneu aponta onde eles ficam.</p>

<h3>Método da moeda</h3>

<p>Coloque uma moeda de R$ 0,25 dentro do sulco com a face do número para dentro. Se você consegue ver o número completo, o sulco está raso demais. Se o número fica parcialmente dentro do pneu, ainda há profundidade adequada.</p>

<h3>Método do paquímetro</h3>

<p>O mais preciso: meça a profundidade do sulco com um paquímetro ou um medidor específico de pneu (R$ 10 a R$ 20 em autopeças):</p>

<ul>
<li><strong>Acima de 4 mm:</strong> bom estado</li>
<li><strong>Entre 2 e 4 mm:</strong> atenção, programe a troca</li>
<li><strong>Abaixo de 2 mm:</strong> troque — especialmente se você usa em chuva</li>
</ul>

<h2>Desgaste irregular: o que o pneu está te dizendo</h2>

<p>A forma como o pneu desgasta conta muito sobre o estado do carro:</p>

<ul>
<li><strong>Desgaste no centro, laterais conservadas:</strong> pneu super-calibrado (pressão alta demais)</li>
<li><strong>Desgaste nas laterais, centro conservado:</strong> pneu sub-calibrado (pressão baixa demais)</li>
<li><strong>Desgaste só em um lado:</strong> problema de alinhamento ou geometria da suspensão</li>
<li><strong>Desgaste em pontos irregulares (manchas):</strong> amortecedor ruim ou freio travando</li>
</ul>

<div data-callout data-title="Desgaste irregular = sinal de outro problema">
Se o pneu está desgastando de forma irregular, trocar o pneu sem corrigir a causa vai repetir o problema no pneu novo. Faça o alinhamento e verifique a suspensão antes ou junto com a troca.
</div>

<h2>Data de fabricação: o pneu pode ser velho sem estar careca</h2>

<p>A borracha envelhece mesmo sem uso intenso. Um pneu que ficou 4 anos na loja ainda tem boa aparência mas está endurecido e sujeito a rachaduras. Todo pneu tem o ano de fabricação no flanco — 4 dígitos dentro de uma elipse (semana + ano).</p>

<p>Pneus com mais de <strong>5 anos</strong> precisam ser inspecionados por um especialista. Com mais de <strong>7 anos</strong>, troque independentemente do estado visual.</p>

<h2>Calibragem correta: mais importante do que parece</h2>

<p>Pneu mal calibrado desgasta até 3 vezes mais rápido do que o necessário. A pressão correta está:</p>

<ul>
<li>No manual do proprietário</li>
<li>Na plaquinha na coluna da porta do motorista</li>
<li>Às vezes no próprio pneu (pressão máxima — não use essa, use a do manual do carro)</li>
</ul>

<p>Calibre sempre com o pneu frio (carro parado por pelo menos 3 horas). Pressão muda com temperatura — um pneu quente pode ter 4 a 6 PSI a mais do que o correto.</p>

<h2>Quanto custa trocar os pneus?</h2>

<ul>
<li><strong>Pneus para carros populares (Gol, Celta, Palio):</strong> R$ 200 a R$ 400 por unidade</li>
<li><strong>Pneus para carros médios (Onix, HB20, Polo):</strong> R$ 300 a R$ 500 por unidade</li>
<li><strong>Pneus para SUVs:</strong> R$ 400 a R$ 800 por unidade</li>
<li><strong>Montagem, balanceamento e alinhamento:</strong> R$ 150 a R$ 300 o conjunto</li>
</ul>

<p>O ideal é trocar os 4 pneus ao mesmo tempo. Se não for possível, troque sempre em par — os dois dianteiros ou os dois traseiros. Nunca misture marcas ou modelos no mesmo eixo.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-14"),
  },
];

async function main() {
  console.log("Iniciando inserção de posts...\n");

  for (const post of posts) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`⏭  Pulando (já existe): ${post.title}`);
      continue;
    }

    await prisma.post.create({ data: post });
    console.log(`✅ Criado: ${post.title}`);
  }

  console.log(`\n✅ Concluído. ${posts.length} posts processados.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
