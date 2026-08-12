import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "barulho-no-motor-quando-acelera",
    title: "Barulho no motor quando acelera: o que pode ser e o que fazer",
    excerpt: "Motor fazendo barulho ao acelerar é sinal de alerta. Pode ser algo simples como falta de óleo ou algo sério como bronzina batendo. Saiba identificar e agir na hora certa.",
    category: "manutencao" as const,
    contentHtml: `<p>Motor fazendo barulho ao acelerar é um dos sinais que mais preocupam motoristas — e com razão. Pode ser algo simples, como um protetor de carter solto, ou algo grave, como uma <strong>bronzina batendo</strong>. O problema é que ignorar faz o estrago crescer.</p>

<h2>Os barulhos mais comuns e o que significam</h2>

<h3>Batida metálica grave ("traque-traque")</h3>
<p>Se você ouve uma batida metálica grave que aumenta com a aceleração, pode ser <strong>bronzina ou bucha batendo</strong>. Isso acontece quando o óleo do motor está baixo ou degradado, e as partes metálicas trabalham sem lubrificação adequada. É a situação mais séria — pare o carro e ligue para uma assistência.</p>

<h3>Chiado ou assovio</h3>
<p>Um chiado agudo que aparece ao acelerar geralmente indica <strong>correia auxiliar ou tensor desgastados</strong>. Às vezes é só a correia escorregando um pouco — troca simples e barata. Pode também ser uma <strong>mangueira de vácuo com vazamento</strong>.</p>

<h3>Barulho de "matraca" rápida</h3>
<p>Esse som rápido e metálico, parecendo uma matraca, costuma ser <strong>folga nos tuchos ou na corrente de comando de válvulas</strong>. Motores com mais de 80.000 km sem ajuste de válvulas são candidatos comuns. O óleo correto e em quantidade certa ajuda muito.</p>

<h3>Ronco ou resmungo ao acelerar com força</h3>
<p>Um ronco que aparece só na aceleração forte pode ser <strong>coxim do motor desgastado</strong>. O motor trepida mais e bate na estrutura. Também pode ser o <strong>escapamento batendo no assoalho</strong> — verifique se há alguma peça solta embaixo.</p>

<h3>Barulho de "batidinha" leve no frio, que some ao esquentar</h3>
<p>Comum em motores mais antigos — é a <strong>folga térmica dos tuchos hidráulicos</strong>. Ao esquentar, o óleo pressuriza o tucho e o barulho some. Geralmente inofensivo, mas indica que o óleo pode estar velho ou com nível baixo.</p>

<h2>O que fazer antes de ir ao mecânico</h2>

<ul>
<li><strong>Verifique o nível de óleo</strong> — motor com barulho e óleo baixo é emergência. Pare imediatamente.</li>
<li><strong>Observe quando o barulho aparece</strong> — a frio, a quente, só ao acelerar forte, ou o tempo todo.</li>
<li><strong>Anote se há fumaça ou luz no painel</strong> — luz de pressão de óleo acesa é parada obrigatória.</li>
<li><strong>Grave um vídeo com o som</strong> — ajuda o mecânico a diagnosticar antes mesmo de abrir o motor.</li>
</ul>

<h2>Quanto custa resolver?</h2>

<p>Depende muito do problema:</p>
<ul>
<li>Correia auxiliar e tensor: R$ 200 a R$ 500</li>
<li>Ajuste de válvulas: R$ 150 a R$ 400</li>
<li>Coxim do motor: R$ 300 a R$ 700 (por coxim)</li>
<li>Bronzina: R$ 1.500 a R$ 4.000 (dependendo do motor)</li>
</ul>

<p>O diagnóstico correto vale mais do que qualquer economia. Um mecânico de confiança que ouve o carro ligado já consegue apontar a direção certa.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-16"),
  },

  {
    slug: "disco-de-freio-com-vibracao",
    title: "Disco de freio com vibração: por que acontece e quando trocar",
    excerpt: "Volante tremendo ao frear é sinal clássico de disco empenado. Mas nem sempre o disco precisa ser trocado — entenda como diagnosticar e economizar na manutenção.",
    category: "manutencao" as const,
    contentHtml: `<p>Você aperta o freio e o volante começa a tremer. Ou sente uma pulsação no pedal. Esse sintoma clássico quase sempre aponta para <strong>disco de freio empenado ou desgastado de forma irregular</strong> — e quanto antes você resolver, menor o estrago.</p>

<h2>Por que o disco de freio empena?</h2>

<p>O disco de freio trabalha em temperaturas altíssimas, especialmente em frenagens bruscas ou em descidas longas. Quando o metal aquece demais e resfria de forma irregular — por exemplo, quando você para o carro com o freio acionado depois de uma frenagem intensa — ele pode se deformar levemente. Essa deformação mínima já é suficiente para causar a vibração que você sente no volante.</p>

<p>Outros motivos para a vibração:</p>
<ul>
<li><strong>Disco com espessura irregular</strong> — desgaste desproporcional entre os lados</li>
<li><strong>Pastilha de freio vitrificada</strong> — quando a pastilha superaquece, o material endurece e transfere depósito desigual no disco</li>
<li><strong>Disco com corrosão profunda</strong> — comum em carros parados por muito tempo</li>
<li><strong>Rolamento de roda com folga</strong> — pode imitar a vibração do disco</li>
</ul>

<h2>Retificar ou trocar o disco?</h2>

<p>Aqui está o ponto onde muita gente economiza na hora errada. <strong>Retificar o disco</strong> (tornear para remover a deformação) só faz sentido se o disco ainda tiver espessura mínima suficiente. Cada disco tem gravado no cubo o valor mínimo de espessura — se após a retificação ficar abaixo desse valor, a troca é obrigatória.</p>

<p>Regra prática: se o carro tem mais de 80.000 km ou o disco está perto do limite, troque. O custo de um par de discos novos com mão de obra (R$ 400 a R$ 900) é muito menor do que os riscos de um freio ineficiente.</p>

<h2>Sempre troque em par</h2>

<p>Discos de freio são trocados sempre <strong>aos pares por eixo</strong> — se o disco dianteiro esquerdo está comprometido, troque o direito junto. Discos com desgastes diferentes causam frenagem assimétrica, que puxa o carro para um lado.</p>

<p>E ao trocar os discos, troque as pastilhas também. Pastilhas velhas encurvadas que trabalham em discos novos criam o mesmo problema em poucos meses.</p>

<h2>Sinais de que não dá para esperar</h2>

<ul>
<li>Vibração intensa que dificulta controlar o volante ao frear</li>
<li>Barulho metálico raspando ao frear (pastilha no limite)</li>
<li>Pedal de freio esponjoso ou indo ao fundo</li>
<li>Carro puxando para um lado ao frear</li>
</ul>

<p>Freio é segurança. Não existe manutenção mais importante para você e para quem está ao redor.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-20"),
  },

  {
    slug: "vela-de-ignicao-com-defeito-sintomas",
    title: "Vela de ignição com defeito: sintomas, teste e quando trocar",
    excerpt: "Vela ruim faz o motor falhar, aumenta o consumo de combustível e ainda pode danificar o catalisador. Aprenda a identificar o problema antes que fique caro.",
    category: "manutencao" as const,
    contentHtml: `<p>As velas de ignição são peças pequenas, baratas e fáceis de trocar — mas quando estão com defeito, causam problemas que parecem bem maiores. <strong>Falhas no motor, aumento de consumo, dificuldade de dar partida</strong> e até dano ao catalisador são consequências diretas de velas em mau estado.</p>

<h2>Como a vela de ignição funciona</h2>

<p>A vela é responsável por gerar a faísca que inflama a mistura de ar e combustível dentro do cilindro. Cada cilindro tem uma vela. Em um motor 1.0 de 3 cilindros, são 3 velas. Em um 4 cilindros, são 4. A faísca precisa acontecer no momento exato, com a intensidade certa — qualquer falha e o cilindro "perde uma explosão".</p>

<h2>Sintomas de vela com defeito</h2>

<h3>Falha no motor ("marcha lenta irregular")</h3>
<p>O sintoma mais clássico. O carro treme em marcha lenta, como se estivesse solavancos. Você pode sentir isso parado no sinal ou logo após dar partida. Cada "falha" é um cilindro que não gerou a explosão naquele ciclo.</p>

<h3>Dificuldade para dar partida</h3>
<p>Se o motor gira mas demora para pegar — especialmente no frio — as velas podem estar desgastadas e não gerando faísca forte o suficiente.</p>

<h3>Aumento no consumo de combustível</h3>
<p>Quando a combustão é incompleta (por falta de faísca), o combustível não é totalmente queimado. O sistema de gerenciamento do motor compensa injetando mais combustível, aumentando o consumo em 10% a 20%.</p>

<h3>Luz de check engine acesa</h3>
<p>Falhas de ignição geram o código P0300 a P0304 no sistema OBD2. Um leitor de OBD (disponível por R$ 50 a R$ 150) confirma o diagnóstico em segundos.</p>

<h3>Perda de potência</h3>
<p>Motor sem força ao acelerar, especialmente em subidas, pode ser sinal de velas gastas que não produzem faísca suficiente para a carga maior.</p>

<h2>Quando trocar as velas?</h2>

<ul>
<li><strong>Velas de cobre/níquel:</strong> a cada 20.000 a 30.000 km</li>
<li><strong>Velas de platina:</strong> a cada 60.000 km</li>
<li><strong>Velas de irídio:</strong> a cada 80.000 a 100.000 km</li>
</ul>

<p>Sempre consulte o manual — o fabricante especifica o tipo correto. Colocar vela errada para o motor pode piorar a situação.</p>

<h2>Quanto custa?</h2>

<ul>
<li>Velas de cobre/níquel: R$ 15 a R$ 40 por unidade</li>
<li>Velas de platina: R$ 40 a R$ 80 por unidade</li>
<li>Velas de irídio: R$ 60 a R$ 150 por unidade</li>
<li>Mão de obra (conjunto): R$ 100 a R$ 250</li>
</ul>

<p>Troque sempre o conjunto completo. Velas novas misturadas com velhas criam combustão irregular entre os cilindros.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-24"),
  },

  {
    slug: "radiador-furado-ou-entupido-causas-e-conserto",
    title: "Radiador furado ou entupido: causas, sinais e o que fazer",
    excerpt: "Motor superaquecendo pode ser radiador com problema. Um radiador furado ou entupido leva ao superaquecimento e pode fundir o motor em poucos minutos. Saiba identificar a tempo.",
    category: "manutencao" as const,
    contentHtml: `<p>O radiador é o coração do sistema de resfriamento do carro. Quando ele falha — seja por furo, entupimento ou vazamento — o motor começa a superaquecer. E motor superaquecido que não é parado a tempo pode ter dano permanente no cabeçote ou nos pistões.</p>

<h2>Como o radiador funciona</h2>

<p>O radiador dissipa o calor gerado pelo motor. O líquido de arrefecimento (água + aditivo) circula pelo motor, absorve calor, passa pelo radiador onde é resfriado pelo ar externo (e pelo ventilador) e volta ao motor mais frio. É um ciclo contínuo enquanto o carro está ligado.</p>

<h2>Sinais de radiador com problema</h2>

<h3>Temperatura subindo acima do normal</h3>
<p>O marcador de temperatura no painel é o primeiro alerta. Se estiver constantemente no limite superior ou ultrapassando — pare o carro. Não espere o superaquecimento completo.</p>

<h3>Líquido de arrefecimento baixando sempre</h3>
<p>Se você precisa completar o reservatório com frequência, há um vazamento em algum lugar do circuito — pode ser o radiador, mangueiras ou a junta do cabeçote.</p>

<h3>Poças de líquido embaixo do carro</h3>
<p>Uma mancha verde, laranja ou rosa embaixo do carro (dependendo da cor do aditivo) indica vazamento de arrefecimento. Verifique se vem do radiador ou das mangueiras.</p>

<h3>Vapor saindo do capô</h3>
<p>Sinal de superaquecimento avançado. Para o carro imediatamente em local seguro e desliga o motor. Não abra o radiador — a pressão pode causar queimaduras graves.</p>

<h3>Óleo com aparência leitosa</h3>
<p>Se o óleo do motor parece misturado com água (coloração leitosa/esbranquiçada), a junta do cabeçote pode ter furado — o arrefecimento está contaminando o óleo. Situação grave.</p>

<h2>Radiador furado vs. entupido</h2>

<p><strong>Furado:</strong> geralmente causado por impacto (pedra na estrada, acidente), corrosão interna por falta de aditivo correto, ou ferrugem. O sistema perde pressão e volume de líquido.</p>

<p><strong>Entupido:</strong> causado pelo uso de água sem aditivo, aditivo vencido ou mistura incorreta. Os depósitos de cal e ferrugem obstruem os canais do radiador, reduzindo a circulação e a dissipação de calor.</p>

<h2>O que fazer em caso de superaquecimento na estrada</h2>

<ol>
<li>Desligue o ar-condicionado imediatamente — reduz a carga no motor</li>
<li>Ligue o aquecedor no máximo — ajuda a dissipar calor do motor</li>
<li>Pare em local seguro e desligue o motor</li>
<li>Aguarde 20 a 30 minutos antes de abrir o capô</li>
<li>Nunca abra o tampão do radiador quente</li>
<li>Chame uma assistência — não continue dirigindo</li>
</ol>

<h2>Quanto custa o conserto?</h2>

<ul>
<li>Reparo de furo (solda/cola epóxi): R$ 80 a R$ 200 — alternativa temporária, não recomendada a longo prazo</li>
<li>Radiador novo (popular): R$ 300 a R$ 700</li>
<li>Radiador novo (veículos maiores): R$ 600 a R$ 1.500</li>
<li>Mão de obra de troca: R$ 150 a R$ 400</li>
<li>Flush e recarga do sistema: R$ 100 a R$ 200</li>
</ul>

<p>Troque o aditivo a cada 2 anos ou 40.000 km — é a melhor prevenção contra entupimento e corrosão interna.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-08-28"),
  },

  {
    slug: "higienizacao-interna-do-carro",
    title: "Higienização interna do carro: como fazer e quanto custa",
    excerpt: "Interior sujo acumula bactérias, fungos e ácaros que causam alergias. Aprenda a higienizar o carro do jeito certo — e quando vale chamar um profissional.",
    category: "dicas" as const,
    contentHtml: `<p>O interior do carro é um dos ambientes mais esquecidos na limpeza — e um dos mais contaminados. Estudos mostram que o painel do carro pode ter mais bactérias do que um vaso sanitário. Bancos de tecido, tapetes e o ar-condicionado acumulam ácaros, fungos e partículas que causam alergias e odores.</p>

<h2>O que é higienização interna vs. limpeza comum</h2>

<p><strong>Limpeza comum:</strong> aspirar, limpar painel e vidros. Retira sujeira visível.</p>
<p><strong>Higienização completa:</strong> vai além — usa produtos específicos para eliminar bactérias, fungos e ácaros dos bancos, tapetes, carpetes, painéis e especialmente do sistema de ar-condicionado.</p>

<h2>O que você precisa para fazer em casa</h2>

<ul>
<li>Aspirador de pó (de preferência com bocal de canto)</li>
<li>Limpa-estofados com enzimas (Veja Multiuso, Spray W5, ou específico automotivo)</li>
<li>Escovas de cerdas macias para costuras</li>
<li>Microfibra (pelo menos 4 panos)</li>
<li>Produto para higienização de ar-condicionado (spray tipo "bomba")</li>
<li>Limpa-vidros automotivo</li>
</ul>

<h2>Passo a passo da higienização</h2>

<ol>
<li><strong>Retire tudo do carro</strong> — tapetes, objetos, lixo</li>
<li><strong>Aspire tudo</strong> — bancos, carpete, entre assentos, porta-luvas</li>
<li><strong>Aplique o limpa-estofados</strong> nos bancos e carpete. Deixe agir por 5 minutos, escore com escova e limpe com microfibra úmida</li>
<li><strong>Limpe o painel</strong> com produto específico — evite silicone líquido nos botões, pois deixa resíduo gorduroso</li>
<li><strong>Higienize o ar-condicionado</strong> — ligue no máximo, posição de recirculação, e aplique o spray higienizador na entrada de ar (grade do passageiro ou painel). Deixe circular por 5 minutos</li>
<li><strong>Limpe os vidros</strong> por dentro com limpa-vidros e microfibra seca</li>
<li><strong>Lave os tapetes externos</strong> com detergente e deixe secar ao sol</li>
</ol>

<h2>Quanto tempo leva?</h2>

<p>Higienização completa feita em casa: 2 a 3 horas. O ponto mais importante é deixar o interior bem seco antes de fechar — umidade retida nos bancos cria mofo.</p>

<h2>Vale a pena contratar um profissional?</h2>

<p>Para higienização profunda com extratora (máquina que injeta e aspira água com produto), a resposta é sim. A extratora alcança as fibras internas do banco e remove sujeiras que limpeza manual não consegue. Preços:</p>

<ul>
<li>Higienização básica profissional: R$ 150 a R$ 300</li>
<li>Higienização completa com extratora: R$ 300 a R$ 600</li>
<li>Higienização completa + ozonização: R$ 400 a R$ 800</li>
</ul>

<h2>Com que frequência higienizar?</h2>

<ul>
<li>Limpeza básica (aspiração + painel): a cada 15 dias</li>
<li>Higienização dos bancos e carpete: a cada 3 meses</li>
<li>Higienização profissional completa: 1 a 2 vezes por ano</li>
</ul>

<p>Se você tem crianças, animais ou alguém com alergia no carro, aumente a frequência. O investimento em saúde sempre compensa.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-09-01"),
  },

  {
    slug: "calibragem-de-pneu-guia-completo",
    title: "Calibragem de pneu: pressão certa, como calibrar e quando checar",
    excerpt: "Pneu calibrado incorretamente aumenta o consumo em até 3%, desgasta mais rápido e compromete a segurança. Guia completo com pressões recomendadas e dicas práticas.",
    category: "dicas" as const,
    contentHtml: `<p>Calibrar o pneu parece simples — e é. Mas a maioria dos motoristas calibra errado: na pressão errada, na temperatura errada, ou simplesmente esquece de checar por meses. O resultado são pneus que gastam mais combustível, desgastam irregularmente e comprometem a frenagem.</p>

<h2>Qual é a pressão certa do meu pneu?</h2>

<p>A pressão correta não está no pneu — está no carro. Procure a etiqueta colada na <strong>quina da porta do motorista</strong> ou no <strong>manual do proprietário</strong>. Ela mostra a pressão recomendada para dianteiro e traseiro, e às vezes uma pressão diferente para o carro carregado.</p>

<p>Não use a pressão máxima gravada no pneu — esse é o limite máximo que o pneu suporta, não a pressão de uso.</p>

<div data-callout data-title="Pressões comuns por categoria">
<ul>
<li>Carros populares (Onix, HB20, Polo): 30 a 32 PSI dianteiro / 28 a 30 PSI traseiro</li>
<li>SUVs e sedãs médios: 32 a 35 PSI</li>
<li>Pneus run-flat: geralmente 44 PSI (sempre cheque a etiqueta)</li>
<li>Motos: entre 29 e 36 PSI (varia muito por modelo)</li>
</ul>
</div>

<h2>Calibrar frio ou quente?</h2>

<p>Sempre <strong>a frio</strong> — com o carro parado há pelo menos 3 horas ou após percurso de no máximo 3 km em baixa velocidade. A pressão aumenta com o calor da rodagem (até 4 PSI), e calibrar com o pneu quente leva a uma pressão real abaixo do recomendado depois que esfria.</p>

<h2>O que acontece com pressão errada</h2>

<h3>Pneu com menos pressão (murcho)</h3>
<ul>
<li>Desgaste excessivo nas bordas (ombros)</li>
<li>Aumento do consumo de combustível em até 3%</li>
<li>Superaquecimento do pneu — risco de estouro</li>
<li>Pior resposta da direção</li>
</ul>

<h3>Pneu com mais pressão (duro demais)</h3>
<ul>
<li>Desgaste excessivo no centro</li>
<li>Menor área de contato com o asfalto — pior frenagem</li>
<li>Conforto reduzido e impactos mais fortes</li>
</ul>

<h2>Como calibrar</h2>

<ol>
<li>Certifique-se de que o pneu está frio</li>
<li>Remova a tampa da válvula (guarde no bolso — é fácil perder)</li>
<li>Encaixe o calibrador ou a mangueira do posto na válvula</li>
<li>Compare com a pressão recomendada</li>
<li>Adicione ou retire ar conforme necessário</li>
<li>Recoloque a tampa imediatamente</li>
<li>Não esqueça o estepe!</li>
</ol>

<h2>Com que frequência checar?</h2>

<p>Pelo menos <strong>a cada 15 dias</strong> — pneus naturalmente perdem 1 a 3 PSI por mês mesmo sem furo. Antes de viagens longas, sempre cheque. E inclua o estepe na rotina — de nada adianta ter estepe se ele estiver vazio na hora que precisar.</p>

<h2>Calibrador digital ou analógico?</h2>

<p>O calibrador digital portátil (R$ 30 a R$ 80) é um dos melhores investimentos para motoristas. Mais preciso que os de posto, permite calibrar em casa a qualquer hora e não depende de compressor.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-09-06"),
  },

  {
    slug: "limpador-de-parabrisa-quando-trocar",
    title: "Limpador de parabrisa: quando trocar e como escolher o certo",
    excerpt: "Palheta ruim não limpa o parabrisa — risca e prejudica a visibilidade na chuva. Saiba quando trocar, como escolher e instalar sem erro.",
    category: "dicas" as const,
    contentHtml: `<p>A palheta do limpador de parabrisa é uma das peças mais baratas do carro — e uma das mais negligenciadas. Quando ela está ruim, não limpa o vidro corretamente: risca, deixa faixas de água e prejudica a visibilidade exatamente quando mais importa: durante a chuva.</p>

<h2>Sinais de que é hora de trocar</h2>

<ul>
<li><strong>Riscas horizontais</strong> no vidro após cada passada</li>
<li><strong>Barulho de chiado ou tranco</strong> ao limpador passar</li>
<li><strong>Limpeza irregular</strong> — partes do vidro ficam sem limpar</li>
<li><strong>Borracha ressecada ou lascada</strong> visível a olho nu</li>
<li><strong>Vidro com película de gordura</strong> que o limpador não remove</li>
</ul>

<p>Em média, as palhetas duram de <strong>6 a 12 meses</strong> — mas quem usa o carro pouco e deixa a borracha ressecar ao sol pode precisar trocar antes mesmo de completar 6 meses.</p>

<h2>Tipos de palheta</h2>

<h3>Palheta convencional (com estrutura metálica)</h3>
<p>O modelo mais barato e popular. Funciona bem, mas a estrutura metálica pode acumular sujeira e corroer com o tempo. Preço: R$ 20 a R$ 60 por unidade.</p>

<h3>Palheta flat (sem estrutura)</h3>
<p>Design moderno, sem hastes metálicas. Distribui a pressão de forma mais uniforme no vidro, limpa melhor e dura mais. É o padrão em carros mais novos. Preço: R$ 50 a R$ 120 por unidade.</p>

<h3>Palheta para chuva pesada / silicone</h3>
<p>Feita de silicone, cria uma camada hidrofóbica no vidro ao passar. Excelente para regiões com chuvas intensas. Preço: R$ 80 a R$ 180 por unidade.</p>

<h2>Como saber o tamanho certo</h2>

<p>Cada carro usa tamanhos diferentes para o lado do motorista e do passageiro. A forma mais simples de descobrir é:</p>
<ol>
<li>Consultar o manual do proprietário</li>
<li>Usar a tabela de compatibilidade na loja de autopeças (física ou online)</li>
<li>Medir a palheta atual com uma fita métrica</li>
</ol>

<h2>Como instalar</h2>

<p>A maioria das palhetas encaixa no braço limpador por pressão. O processo geral:</p>
<ol>
<li>Levante o braço limpador até a posição vertical (ele trava)</li>
<li>Pressione a trava no meio da palheta e deslize para remover</li>
<li>Encaixe a nova palheta até ouvir o clique</li>
<li>Abaixe o braço com cuidado — não solte de estalo no vidro seco</li>
</ol>

<p>Instalar leva menos de 5 minutos por palheta. Não precisa de mecânico.</p>

<h2>Dica extra: cuidados para durar mais</h2>

<ul>
<li>Nunca use o limpador em vidro seco — risca o vidro e desgasta a borracha</li>
<li>Limpe a borracha com álcool isopropílico a cada 3 meses</li>
<li>Ao estacionar no sol por longos períodos, levante as palhetas para não ressecar no vidro quente</li>
</ul>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-09-10"),
  },

  {
    slug: "terminal-de-direcao-desgastado-sintomas",
    title: "Terminal de direção desgastado: sintomas, riscos e custo de troca",
    excerpt: "Terminal de direção com folga causa imprecisão na direção e riscos sérios. Os sintomas são claros — aprenda a identificar antes que vire um acidente.",
    category: "alertas" as const,
    contentHtml: `<p>O terminal de direção é uma peça de esfera — uma junta que une a barra de direção com a manga de eixo, permitindo que a roda esterçe ao girar o volante. Quando essa peça desgasta, a direção perde precisão e você perde o controle sobre para onde o carro vai. É uma peça de segurança crítica.</p>

<h2>Sintomas de terminal de direção desgastado</h2>

<h3>Folga ou imprecisão na direção</h3>
<p>O sintoma mais claro. Você gira o volante levemente e o carro parece não responder imediatamente. Ou o volante "flutua" ligeiramente antes de transmitir o movimento para a roda. Essa folga aumenta progressivamente conforme o desgaste avança.</p>

<h3>Barulho ao passar em lombadas ou buracos</h3>
<p>Um estralo ou "clunk" metálico ao passar por irregularidades — especialmente ao esterçar ao mesmo tempo — é sinal clássico de terminal frouxo. O barulho vem da esfera batendo na capa.</p>

<h3>Carro puxando para um lado</h3>
<p>Terminal muito desgastado pode fazer o carro desviar sutilmente, porque o alinhamento real das rodas muda com a folga. Mesmo após o alinhamento novo, o problema volta rápido se o terminal não for trocado.</p>

<h3>Vibração no volante</h3>
<p>Menos comum que a folga, mas acontece quando o desgaste é severo e as rodas balançam levemente.</p>

<h2>Como confirmar o diagnóstico</h2>

<p>Um mecânico experiente consegue diagnosticar em 30 segundos: com o carro levantado, ele segura a roda com as mãos nas posições 9h e 3h e tenta movê-la horizontalmente. Se houver folga perceptível, o terminal está comprometido.</p>

<p>Você mesmo pode fazer o teste: com o capô aberto e um ajudante girando o volante de um lado para o outro, observe a barra de direção. Se a barra se move mas a roda demora a acompanhar (ou vice-versa), há folga no terminal.</p>

<h2>É perigoso continuar rodando?</h2>

<p>Sim. Em curvas rápidas, o terminal desgastado pode ceder de forma imprevisível. A roda muda a direção subitamente e você não tem como compensar a tempo. O risco é maior em alta velocidade ou em manobras bruscas.</p>

<p>Não existe "terminal desgastado que pode esperar mais um pouco". Quando o diagnóstico é confirmado, troque o quanto antes.</p>

<h2>Quanto custa trocar?</h2>

<ul>
<li>Terminal de direção (peça): R$ 40 a R$ 150 por unidade</li>
<li>Mão de obra: R$ 80 a R$ 200 (inclui alinhamento posterior)</li>
<li>Alinhamento obrigatório após a troca: R$ 80 a R$ 150</li>
</ul>

<p>O correto é trocar <strong>sempre em par</strong> — se um está desgastado, o outro está próximo do mesmo ponto. E o alinhamento deve ser feito logo após a troca, senão os pneus desgastam irregularmente.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-09-15"),
  },

  {
    slug: "polimento-de-carro-como-fazer-em-casa",
    title: "Polimento de carro em casa: passo a passo para iniciantes",
    excerpt: "Polir o carro em casa é possível com os produtos certos. Saiba a diferença entre cristalização, polimento e vitrificação — e qual escolher para sua situação.",
    category: "dicas" as const,
    contentHtml: `<p>A pintura do carro envelhece com o tempo — arranhões superficiais, oxidação, falta de brilho. O polimento é o processo que restaura e protege a pintura. Você não precisa de uma máquina polixadora profissional para resultados excelentes — com os produtos certos e paciência, dá para fazer em casa.</p>

<h2>Entendendo os termos: polimento, cristalização e vitrificação</h2>

<h3>Polimento</h3>
<p>Remove microarranhões, oxidação e manchas da pintura. Usa um composto abrasivo suave que "raspa" uma camada finíssima da pintura, revelando a camada mais nova abaixo. Resultado: brilho intenso e pintura uniforme.</p>

<h3>Cristalização</h3>
<p>Processo que aplica um produto à base de cera ou polímero que cria uma camada protetora sobre a pintura. Dá brilho e protege contra água, sol e sujeira. Dura de 3 a 6 meses.</p>

<h3>Vitrificação</h3>
<p>Versão avançada da cristalização, usando cerâmica ou quartzo. Cria uma camada muito mais dura e durável — de 1 a 3 anos. É o que garages e detailers profissionais aplicam. Mais cara, exige mais preparo da pintura.</p>

<h2>O que você precisa para polir em casa</h2>

<ul>
<li>Polidor de pintura (Silicone Brilho, Meguiar's Ultimate Polish, etc.)</li>
<li>Esponja de polimento (ou politriz elétrica, opcional)</li>
<li>Panos de microfibra (mínimo 4)</li>
<li>Balde com água e shampoo automotivo</li>
<li>Fita crepe (para proteger borrachas e plásticos)</li>
</ul>

<h2>Passo a passo do polimento manual</h2>

<ol>
<li><strong>Lave o carro completamente</strong> — nenhum grão de areia pode ficar na pintura antes de polir</li>
<li><strong>Seque bem</strong> com microfibra — nunca polir com pintura úmida</li>
<li><strong>Cubra borrachas, plásticos e emblemas</strong> com fita crepe</li>
<li><strong>Aplique o polidor</strong> na esponja — uma quantidade do tamanho de uma moeda para uma área de 30x30 cm</li>
<li><strong>Trabalhe em movimentos circulares</strong> com pressão moderada. Faça uma seção por vez</li>
<li><strong>Retire o excesso</strong> com microfibra limpa antes que o produto seque completamente</li>
<li><strong>Repita</strong> nas demais seções</li>
<li><strong>Aplique a cera protetora</strong> ao final — sempre após o polimento</li>
</ol>

<h2>Dicas importantes</h2>

<ul>
<li>Nunca polir ao sol — o produto seca rápido demais e marca a pintura</li>
<li>Trabalhe em seções pequenas (capô, lateral dianteira, etc.)</li>
<li>Panos de microfibra precisam estar limpos — um grão de areia risca a pintura</li>
<li>Carros de cor preta ou escura mostram mais os microarranhões — exigem mais cuidado</li>
</ul>

<h2>Vale a pena contratar?</h2>

<p>Para polimento básico de manutenção: faça em casa, economize. Para vitrificação ou correção de pintura com riscos profundos: um detailer profissional vale cada centavo. Preços de serviço profissional:</p>

<ul>
<li>Polimento simples: R$ 150 a R$ 400</li>
<li>Polimento + cristalização: R$ 300 a R$ 600</li>
<li>Vitrificação (cerâmica): R$ 800 a R$ 2.500</li>
</ul>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-09-20"),
  },

  {
    slug: "freio-de-moto-disco-ou-tambor",
    title: "Freio de moto: disco ou tambor — diferenças, manutenção e quando trocar",
    excerpt: "Entender o sistema de freios da sua moto é essencial para a segurança. Veja as diferenças entre disco e tambor, sinais de desgaste e manutenção preventiva.",
    category: "manutencao" as const,
    contentHtml: `<p>O freio é o sistema de segurança mais importante de uma moto. E ao contrário do carro, onde o pedal de freio é único, na moto você gerencia dois sistemas separados — o freio dianteiro e o traseiro. Conhecer o tipo de freio da sua moto e quando ele precisa de atenção pode ser a diferença entre parar a tempo e não parar.</p>

<h2>Freio a disco</h2>

<p>É o sistema mais eficiente e o padrão em motos modernas. Um disco metálico prende na roda, e pinças com pastilhas de freio apertam esse disco quando você aciona o manete ou pedal.</p>

<p><strong>Vantagens:</strong> melhor frenagem, dissipa calor mais eficientemente, desempenho constante mesmo molhado (após os primeiros acionamentos), manutenção mais fácil de monitorar.</p>

<p><strong>Manutenção do freio a disco:</strong></p>
<ul>
<li>Verifique as pastilhas a cada 10.000 km — a maioria tem indicador de desgaste</li>
<li>Troque quando a espessura chegar a 2 mm ou menos</li>
<li>Observe o nível do fluido de freio (reservatório transparente no guidão)</li>
<li>Troque o fluido de freio a cada 2 anos ou 20.000 km — ele absorve umidade e perde eficiência</li>
<li>Disco riscado profundamente ou com espessura abaixo do mínimo gravado: troque</li>
</ul>

<h2>Freio a tambor</h2>

<p>Ainda presente no freio traseiro de muitas motos populares (CG 160, Biz, Pop) e em modelos de entrada. O funcionamento é diferente: sapatas de freio expandem para dentro de um tambor cilíndrico que gira com a roda.</p>

<p><strong>Vantagens:</strong> mais barato, protegido da sujeira e chuva, dura mais em uso normal.</p>

<p><strong>Desvantagens:</strong> dissipa calor pior, pode "feder" em frenagens prolongadas, desempenho reduz quando molhado.</p>

<p><strong>Manutenção do freio a tambor:</strong></p>
<ul>
<li>Observe se o pedal ou a alavanca vai mais fundo que o normal — sinal de sapata gasta ou cabo fora de regulagem</li>
<li>Sapatas devem ser trocadas quando a espessura fica abaixo de 2 mm</li>
<li>Regulagem do cabo traseiro: verifique a cada 5.000 km</li>
</ul>

<h2>Sinais gerais de que o freio precisa de atenção</h2>

<ul>
<li>Alavanca ou pedal indo mais fundo antes de frear</li>
<li>Barulho de rangido ou chiado ao frear</li>
<li>Moto puxando para um lado ao frear</li>
<li>Vibração na alavanca ou guidão ao frear</li>
<li>Mancha de óleo/fluido na roda (indica vazamento na pinça)</li>
</ul>

<h2>Custos de manutenção</h2>

<ul>
<li>Pastilha de freio a disco (par): R$ 40 a R$ 120</li>
<li>Disco de freio: R$ 100 a R$ 350</li>
<li>Sapata de freio a tambor (par): R$ 30 a R$ 80</li>
<li>Fluido de freio (DOT 4, 500ml): R$ 25 a R$ 60</li>
<li>Mão de obra: R$ 80 a R$ 200 por eixo</li>
</ul>

<p>Freio de moto nunca pode esperar. A margem de erro é menor do que no carro — invista na manutenção.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-09-25"),
  },

  {
    slug: "farol-queimado-como-trocar-e-multa",
    title: "Farol queimado: como trocar, tipos de lâmpada e a multa que pode levar",
    excerpt: "Farol apagado é infração gravíssima no Código de Trânsito. Saiba como identificar, qual lâmpada comprar e como trocar — muitos modelos não precisam de mecânico.",
    category: "alertas" as const,
    contentHtml: `<p>Dirigir com farol queimado não é só perigoso — é infração gravíssima no Código de Trânsito Brasileiro, com multa de R$ 293,47 e 7 pontos na carteira. E o pior: muitos motoristas nem percebem que o farol baixo de um lado está apagado, especialmente de dia.</p>

<h2>Como saber se o farol está queimado</h2>

<p>Faça o teste simples: ligue o carro e os faróis, desça e caminhe ao redor. Faça isso de dia também, porque o farol baixo deve estar ligado durante o dia nas rodovias federais — é obrigatório por lei desde 2016.</p>

<p>Outra maneira: ao estacionar em frente a uma parede, você consegue ver claramente quais lâmpadas estão funcionando.</p>

<h2>Tipos de lâmpada de farol</h2>

<h3>Halógena (a mais comum)</h3>
<p>Presente na grande maioria dos carros populares. A lâmpada mais barata e fácil de trocar. Vida útil de 500 a 1.000 horas. Preço: R$ 20 a R$ 80 por unidade.</p>

<h3>HID (Xenon)</h3>
<p>Luz mais branca e intensa, comum em carros médios e SUVs. Mais cara e a troca geralmente requer um profissional — o sistema de ignição opera com alta tensão. Preço: R$ 80 a R$ 350.</p>

<h3>LED</h3>
<p>Padrão em carros mais novos. Alta eficiência, longa duração (30.000+ horas), mas quando queima, a troca pode ser cara porque o módulo LED às vezes é integrado ao conjunto do farol. Peça: R$ 50 a R$ 500+ dependendo do modelo.</p>

<h2>Como trocar a lâmpada halógena</h2>

<p>Em muitos carros populares (Onix, HB20, Kwid, Gol), é possível trocar sem ferramentas:</p>

<ol>
<li>Desligue o carro e os faróis</li>
<li>Abra o capô e localize a parte traseira do farol</li>
<li>Desencaixe o conector elétrico (pressione a trava e puxe)</li>
<li>Gire a borracha ou o retentor da lâmpada no sentido anti-horário e puxe</li>
<li><strong>Importante: nunca toque na parte de vidro da lâmpada nova com os dedos</strong> — a gordura da pele queima o vidro e reduz a vida útil</li>
<li>Encaixe a nova lâmpada, recoloque o retentor e o conector</li>
<li>Teste antes de fechar o capô</li>
</ol>

<p>Se o acesso está bloqueado (motor muito próximo do farol), um mecânico resolve em 20 minutos.</p>

<h2>A multa por farol apagado</h2>

<p>De acordo com o CTB:</p>
<ul>
<li><strong>Art. 230, inciso VII:</strong> conduzir veículo com dispositivo de iluminação em mau funcionamento</li>
<li><strong>Classificação:</strong> Gravíssima</li>
<li><strong>Multa:</strong> R$ 293,47</li>
<li><strong>Pontos:</strong> 7 pontos na CNH</li>
</ul>

<h2>Quando trocar em par?</h2>

<p>Se um farol queimou e o carro tem mais de 80.000 km, considere trocar os dois. Lâmpadas do mesmo veículo têm tempo de uso similar — se uma foi, a outra provavelmente está perto do fim.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-09-30"),
  },

  {
    slug: "amortecedor-ruim-como-identificar",
    title: "Amortecedor ruim: como identificar, riscos e quando trocar",
    excerpt: "Amortecedor desgastado não para o carro no tempo certo. A distância de frenagem aumenta, a dirigibilidade piora e os pneus desgastam mais rápido. Saiba identificar.",
    category: "manutencao" as const,
    contentHtml: `<p>O amortecedor tem uma função simples mas essencial: controlar o salto da mola e manter os pneus em contato com o asfalto. Quando ele falha, os pneus "pulam" sobre o asfalto e a distância de frenagem aumenta significativamente — em alguns testes, amortecedores gastos aumentaram a distância de parada em até 20%.</p>

<h2>Sintomas de amortecedor desgastado</h2>

<h3>Carro balançando muito em lombadas</h3>
<p>O sintoma mais claro. Após passar por um buraco ou lombada, o carro continua oscilando por mais de 1 a 2 ciclos. Um amortecedor bom para o movimento imediatamente.</p>

<h3>Nariz do carro mergulha na frenagem</h3>
<p>Ao frear com intensidade, a frente do carro desce demais (mergulha). Isso reduz a eficiência do freio traseiro e aumenta a distância de parada.</p>

<h3>Instabilidade em curvas</h3>
<p>Carro que "rola" demais em curvas, como se fosse tombar — sensação de falta de firmeza — indica amortecedores traseiros gastos.</p>

<h3>Desgaste irregular dos pneus</h3>
<p>Pneu com desgaste em manchas irregulares (não uniforme) é sinal de que a roda está "pulando" sobre o asfalto ao invés de rolar suavemente. Examine o pneu de perto.</p>

<h3>Vibração no volante</h3>
<p>Amortecedor dianteiro ruim pode causar vibração no volante mesmo em estradas relativamente lisas.</p>

<h3>Vazamento de óleo</h3>
<p>Amortecedores hidráulicos têm óleo interno. Se você ver uma camada de óleo ou umidade ao redor do amortecedor, ele está com vedação comprometida e precisa de troca.</p>

<h2>Teste rápido do peso</h2>

<p>Vá a uma das quinas do carro, empurre com força para baixo e solte. Se o carro subir, descer e <strong>parar em no máximo 1 ou 2 oscilações</strong>, o amortecedor está funcionando. Se continuar balançando 3 vezes ou mais, está na hora de trocar.</p>

<h2>Quando trocar preventivamente?</h2>

<p>Amortecedores não têm intervalo fixo como o óleo do motor. A vida útil depende muito das condições das estradas. Uma referência comum:</p>
<ul>
<li>Uso urbano com estradas ruins: 50.000 a 60.000 km</li>
<li>Uso misto com estradas boas: 80.000 a 100.000 km</li>
<li>Sempre em par por eixo — se um está ruim, o outro também desgastou</li>
</ul>

<h2>Quanto custa trocar?</h2>

<ul>
<li>Amortecedor popular (por unidade): R$ 150 a R$ 400</li>
<li>Amortecedor com mola (conjunto): R$ 300 a R$ 700 por unidade</li>
<li>Mão de obra por eixo (par): R$ 200 a R$ 500</li>
<li>Alinhamento e balanceamento após troca: R$ 150 a R$ 300</li>
</ul>

<p>Após a troca dos amortecedores, alinhamento e balanceamento são obrigatórios — os pneus precisam se readaptar à nova geometria.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-10-05"),
  },

  {
    slug: "escapamento-soltando-fumaca-o-que-significa",
    title: "Escapamento soltando fumaça: o que a cor da fumaça diz sobre o motor",
    excerpt: "Fumaça preta, branca ou azul no escapamento têm significados muito diferentes. Algumas são normais, outras indicam problemas sérios. Aprenda a interpretar cada cor.",
    category: "alertas" as const,
    contentHtml: `<p>Nem toda fumaça no escapamento é problema. Mas a cor da fumaça é um dos diagnósticos visuais mais reveladores que você pode fazer no seu carro. Saber interpretar o que sai pelo cano do escapamento pode te poupar de uma conta grande — ou confirmar que tudo está bem.</p>

<h2>Fumaça branca — depende do contexto</h2>

<h3>Vapor d'água (normal)</h3>
<p>No frio, logo após ligar o carro, é completamente normal sair uma fumaça branca e fina pelo escapamento. É apenas vapor d'água condensado — a mesma coisa que você vê ao respirar em dia frio. Desaparece em poucos minutos quando o motor esquenta.</p>

<h3>Fumaça branca densa e constante (problema sério)</h3>
<p>Se a fumaça branca é espessa, tem cheiro adocicado e não desaparece — é o sinal clássico de <strong>junta do cabeçote furada</strong>. O líquido de arrefecimento está entrando na câmara de combustão e sendo queimado junto com o combustível. Consequências: motor pode superaquecer e fundir. <strong>Pare de dirigir e chame uma assistência.</strong></p>

<h2>Fumaça preta</h2>

<p>Fumaça preta indica <strong>mistura rica</strong> — excesso de combustível na combustão. O motor está queimando mais combustível do que deveria. Causas comuns:</p>

<ul>
<li>Injetor de combustível sujo ou com defeito</li>
<li>Sensor do ar-fluxo (MAF) com falha</li>
<li>Filtro de ar entupido</li>
<li>Sensor de oxigênio (lambda) com problema</li>
</ul>

<p>Além de poluente, a fumaça preta significa aumento no consumo de combustível e possível dano ao catalisador com o tempo. Leve ao mecânico para diagnóstico eletrônico (OBD2).</p>

<h2>Fumaça azul ou cinza-azulada</h2>

<p>Fumaça azulada é o sinal de que <strong>óleo do motor está sendo queimado</strong>. Isso acontece quando as vedações internas do motor (anéis de pistão, retentores de válvula) estão gastas e permitem a entrada de óleo na câmara de combustão.</p>

<p>Mais comum em:</p>
<ul>
<li>Motores com mais de 150.000 km sem revisão</li>
<li>Carros que sempre usaram óleo inadequado ou atrasaram a troca</li>
<li>Turbo com vedação comprometida</li>
</ul>

<p>O diagnóstico mais simples: verifique o nível de óleo regularmente. Se estiver caindo sem vazamento visível — o motor está queimando óleo internamente. O conserto pode ser simples (troca de retentores) ou complexo (retífica do motor), dependendo da gravidade.</p>

<h2>Tabela resumo</h2>

<table>
<thead><tr><th>Cor</th><th>O que indica</th><th>Urgência</th></tr></thead>
<tbody>
<tr><td>Branca fina (frio)</td><td>Vapor d'água — normal</td><td>Nenhuma</td></tr>
<tr><td>Branca densa + cheiro doce</td><td>Junta do cabeçote</td><td>Alta — pare imediatamente</td></tr>
<tr><td>Preta</td><td>Mistura rica / injeção</td><td>Média — diagnóstico em breve</td></tr>
<tr><td>Azul / cinza-azul</td><td>Óleo queimando</td><td>Média a alta — monitore o óleo</td></tr>
</tbody>
</table>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-10-10"),
  },

  {
    slug: "onde-comprar-pecas-de-carro-baratas",
    title: "Onde comprar peças de carro baratas: lojas, sites e como não levar gato por lebre",
    excerpt: "Pagar menos por peças automotivas é possível — se você souber onde comprar e como verificar a qualidade. Guia completo com opções online e físicas.",
    category: "dicas" as const,
    contentHtml: `<p>Manutenção de carro é cara — mas parte desse custo pode ser reduzida comprando peças de forma inteligente. A diferença de preço entre a concessionária, a loja de autopeças de bairro e os marketplaces online pode chegar a 50% para a mesma peça. Saber onde e como comprar faz toda a diferença.</p>

<h2>Tipos de peças: original, paralela e remanufaturada</h2>

<h3>Original (genuína)</h3>
<p>Fabricada pelo mesmo fornecedor da montadora. Vem com o logo da marca do carro ou do fornecedor original (Bosch, Valeo, SKF, etc.). Maior qualidade garantida, maior preço. Ideal para peças críticas: correia dentada, pastilha de freio, correia auxiliar.</p>

<h3>Paralela (aftermarket)</h3>
<p>Fabricada por terceiros com as mesmas especificações. Qualidade varia muito por marca — existem paralelas excelentes (Nakata, Cofap, TRW) e paralelas de qualidade duvidosa. Para peças de desgaste (filtros, pastilhas, lâmpadas), marcas conhecidas de aftermarket são ótima opção.</p>

<h3>Remanufaturada</h3>
<p>Peça usada que passou por processo industrial de recondicionamento. Boa opção para alternador, motor de partida, compressor de ar-condicionado. Custo 30 a 60% menor que a original nova, com garantia.</p>

<h2>Onde comprar online com segurança</h2>

<ul>
<li><strong>Mercado Livre:</strong> maior volume, mais opções, preços competitivos. Compre de vendedores com reputação acima de 95% e muitas vendas</li>
<li><strong>Amazon Brasil:</strong> seleção menor, mas com proteção do comprador confiável</li>
<li><strong>Netshop:</strong> especializada em autopeças, catálogo por modelo do carro</li>
<li><strong>AutoPeças Já, Peças Aqui, etc.:</strong> plataformas específicas para autopeças — bom para comparar preços</li>
</ul>

<p>Dica fundamental: <strong>sempre pesquise pelo código da peça</strong>, não pelo nome genérico. O código original (impresso na peça ou no manual) garante que você está comprando a peça certa.</p>

<h2>Lojas físicas — quando valem mais a pena</h2>

<ul>
<li><strong>Lojas de rede (Leroy Merlin Auto, AutoZone, Pneus&Cia):</strong> preços médios, boa assistência, garantia sólida</li>
<li><strong>Distribuidoras de autopeças:</strong> onde os mecânicos compram. Preços melhores, mas atendimento pode ser técnico demais para leigos</li>
<li><strong>Ferro-velhos / desmanche:</strong> peças usadas de carros acidentados. Ótimo para peças de carroceria e plásticos. Exige inspeção visual cuidadosa</li>
</ul>

<h2>Cuidados para não cair em armadilha</h2>

<ul>
<li><strong>Desconfie de preço muito abaixo do mercado</strong> — peça falsa ou de qualidade duvidosa custa mais na mão de obra que você desperdiça</li>
<li><strong>Verifique a embalagem</strong> — peça original vem em embalagem lacrada com código do fabricante</li>
<li><strong>Guarde a nota fiscal</strong> — para garantia em caso de defeito prematuro</li>
<li><strong>Peças críticas de segurança</strong> (freio, direção, suspensão): prefira sempre marcas conhecidas, mesmo que custe um pouco mais</li>
</ul>

<h2>Quanto dá para economizar?</h2>

<p>Em peças de desgaste como filtros, velas e pastilhas, a economia comparando concessionária vs. aftermarket de qualidade pode ser de 40 a 60%. Em peças de reposição como sensores e atuadores, 20 a 40%. Vale pesquisar antes de aceitar a primeira cotação.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-10-15"),
  },

  {
    slug: "corrente-de-moto-como-regular-e-lubrificar",
    title: "Corrente de moto: como regular a tensão e lubrificar do jeito certo",
    excerpt: "Corrente mal regulada ou sem lubrificação quebra na estrada e pode causar acidentes graves. Aprenda a manutenção que todo motociclista precisa saber.",
    category: "manutencao" as const,
    contentHtml: `<p>A corrente de transmissão é a responsável por levar a força do motor até a roda traseira da moto. Uma corrente com regulagem errada ou sem lubrificação adequada desgasta rápido, prejudica o desempenho e, no pior caso, arrebenta enquanto você está andando — o que pode travar a roda traseira e causar um acidente grave.</p>

<h2>Como verificar a tensão da corrente</h2>

<p>A corrente não deve estar nem muito tensa (risco de quebrar e danificar o câmbio) nem muito folgada (pode pular o pinhão ou bater no protetor de corrente).</p>

<p>Para verificar:</p>
<ol>
<li>Coloque a moto no cavalete central ou lateral nivelado</li>
<li>Encontre o ponto mais folgado da corrente — geralmente na parte inferior, entre o pinhão e a coroa</li>
<li>Com o dedo, empurre a corrente para cima e para baixo</li>
<li>A folga total (de baixo para cima) deve ser de <strong>20 a 30 mm</strong> para a maioria das motos — confirme no manual</li>
</ol>

<h2>Como regular a tensão</h2>

<p>A regulagem é feita pelos ajustadores de corrente, na parte traseira do balancim (atrás do eixo da roda).</p>

<ol>
<li>Afrouxe a porca do eixo da roda traseira (não remova)</li>
<li>Gire os parafusos ajustadores dos dois lados <strong>igualmente</strong> — isso é crucial para manter o alinhamento da roda</li>
<li>Verificando as marcas de alinhamento gravadas no basculante — os dois lados precisam estar na mesma posição</li>
<li>Verifique a folga novamente e ajuste até ficar dentro do intervalo correto</li>
<li>Aperte a porca do eixo no torque especificado (consulte o manual — geralmente 70 a 100 Nm)</li>
</ol>

<h2>Como lubrificar corretamente</h2>

<p>A lubrificação incorreta é quase tão prejudicial quanto a falta de lubrificação. Nunca use óleo de motor ou graxa comum — eles atraem sujeira e formam pasta abrasiva.</p>

<p>Use <strong>spray de corrente</strong> específico para motos (marcas como Motul, Wurth, Castrol). Ele penetra entre os elos e sela a sujeira para fora.</p>

<p>Procedimento:</p>
<ol>
<li>Aplique o spray com a moto no cavalete, girando a roda traseira devagar</li>
<li>Aplique na parte interna da corrente (onde ela toca o pinhão e a coroa)</li>
<li>Deixe penetrar por 5 minutos antes de sair com a moto</li>
</ol>

<h2>Frequência de manutenção</h2>

<ul>
<li><strong>Lubrificação:</strong> a cada 500 km (ou após chuva intensa)</li>
<li><strong>Verificação de tensão:</strong> a cada 1.000 km</li>
<li><strong>Regulagem:</strong> sempre que sair do intervalo recomendado</li>
<li><strong>Troca do kit (corrente + pinhão + coroa):</strong> entre 20.000 e 30.000 km — sempre troque o conjunto completo</li>
</ul>

<h2>Sinais de que a corrente precisa ser trocada</h2>

<ul>
<li>Corrente "esticada" — não consegue mais ser tensionada dentro do intervalo correto</li>
<li>Elos enferrujados ou com jogo lateral excessivo</li>
<li>Coroa ou pinhão com dentes em formato de "gancho" (desgaste em ponta)</li>
</ul>

<p>Kit de corrente + coroa + pinhão: R$ 150 a R$ 400 dependendo da moto. Mão de obra: R$ 80 a R$ 180.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-10-20"),
  },

  {
    slug: "gasolina-ou-etanol-qual-compensa",
    title: "Gasolina ou etanol: qual compensa mais? O cálculo que todo motorista precisa saber",
    excerpt: "A regra dos 70% é o cálculo básico para decidir entre gasolina e etanol. Mas há outros fatores que influenciam. Aprenda a tomar a decisão certa sempre que for ao posto.",
    category: "dicas" as const,
    contentHtml: `<p>Se o seu carro é flex (e a maioria dos carros brasileiros é), você enfrenta essa dúvida toda vez que para no posto: gasolina ou etanol? A resposta depende de um cálculo simples — mas tem nuances que fazem diferença no bolso.</p>

<h2>A regra dos 70%</h2>

<p>O etanol tem menor teor energético que a gasolina. Em média, o motor consome cerca de 30% mais etanol para percorrer a mesma distância. Por isso, o etanol só compensa financeiramente se custar <strong>menos de 70% do preço da gasolina</strong>.</p>

<p>A fórmula:</p>
<p><strong>Preço do etanol ÷ Preço da gasolina</strong></p>
<ul>
<li>Resultado abaixo de 0,70 → etanol compensa</li>
<li>Resultado acima de 0,70 → gasolina compensa</li>
</ul>

<p><strong>Exemplo prático:</strong> gasolina a R$ 6,20 e etanol a R$ 4,10.</p>
<p>4,10 ÷ 6,20 = 0,66 → etanol compensa (0,66 < 0,70)</p>

<p><strong>Outro exemplo:</strong> gasolina a R$ 6,00 e etanol a R$ 4,50.</p>
<p>4,50 ÷ 6,00 = 0,75 → gasolina compensa (0,75 > 0,70)</p>

<h2>Mas a regra dos 70% é universal?</h2>

<p>Não exatamente. A eficiência do motor com etanol varia por modelo. Alguns carros flex otimizados para etanol têm relação de compressão maior e aproveitam melhor o combustível. Nesses casos, o limiar pode ser 72% ou 73%.</p>

<p>Para ter o número exato do seu carro, faça o teste:</p>
<ol>
<li>Abasteca cheio com etanol</li>
<li>Zere o hodômetro parcial</li>
<li>Dirija normalmente até o tanque baixo</li>
<li>Anote os km percorridos e calcule o km/L</li>
<li>Repita com gasolina</li>
<li>Divida km/L do etanol ÷ km/L da gasolina — esse é o seu limiar pessoal</li>
</ol>

<h2>Outros fatores além do preço</h2>

<h3>Partida no frio</h3>
<p>Etanol tem dificuldade de vaporizar em temperaturas abaixo de 15°C. Em cidades mais frias (Sul do Brasil, inverno em SP), o carro pode demorar mais para pegar com etanol puro. A gasolina tem melhor comportamento no frio.</p>

<h3>Desempenho</h3>
<p>Etanol tem octanagem mais alta que a gasolina comum (em torno de 110 vs. 87). Em motores de alto desempenho, o etanol pode gerar mais potência. Para uso cotidiano, a diferença é imperceptível.</p>

<h3>Impacto ambiental</h3>
<p>O etanol de cana tem ciclo de carbono mais favorável que a gasolina. Se esse fator importa para você, ele pesa a favor do etanol além do preço.</p>

<h2>Apps para encontrar o combustível mais barato</h2>

<p>Além da conta, também vale pesquisar onde o combustível é mais barato na sua região:</p>
<ul>
<li><strong>Melhor Rota</strong> — comparador de preços por localização</li>
<li><strong>Waze</strong> — inclui preços de postos no trajeto</li>
<li><strong>TanqueCheio</strong> — histórico de preços por posto</li>
</ul>

<p>A combinação de combustível certo + posto mais barato pode representar uma economia real de R$ 50 a R$ 100 por mês para quem roda bastante.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-10-25"),
  },

  {
    slug: "ar-condicionado-carro-nao-gela-o-que-fazer",
    title: "Ar-condicionado do carro não gela: causas e o que checar antes de chamar o mecânico",
    excerpt: "AC que não gela pode ser falta de gás, compressor com defeito ou apenas filtro de cabine entupido. Aprenda a identificar a causa antes de gastar desnecessariamente.",
    category: "manutencao" as const,
    contentHtml: `<p>Ar-condicionado que para de gelar — especialmente no verão ou antes de uma viagem longa — é um dos problemas mais incômodos do carro. A boa notícia é que nem sempre é um reparo caro. Às vezes, a solução é simples.</p>

<h2>Antes de ir ao mecânico: o que você pode checar</h2>

<h3>1. Filtro de cabine</h3>
<p>O filtro de cabine (ou filtro de ar interno) é responsável por filtrar o ar que entra pelo sistema de ventilação. Quando entupido, reduz drasticamente o fluxo de ar — o AC até gela, mas o ar frio mal chega ao interior. É a causa mais simples e mais ignorada.</p>

<p>Troca simples, geralmente sem ferramentas, por trás do porta-luvas ou embaixo do painel. Peça: R$ 30 a R$ 80. Troque a cada 15.000 km ou 1 ano.</p>

<h3>2. Condensador sujo</h3>
<p>O condensador do AC fica na frente do carro, junto ao radiador, e disipa o calor do gás. Sujo de insetos, lama e folhas, perde eficiência. Uma lavagem de alta pressão no condensador (feita em lavagem especializada) pode resolver o problema sem custo de peça.</p>

<h2>Causas que precisam de mecânico</h2>

<h3>Falta de gás refrigerante</h3>
<p>O gás refrigerante (R-134a nos carros mais antigos, R-1234yf nos mais novos) circula em sistema fechado. Se houver vazamento, o AC perde eficiência progressivamente até parar de gelar. Sintomas: AC gela pouco ou gelava bem e foi perdendo eficiência com o tempo.</p>

<p>O mecânico faz o reabastecimento com equipamento específico. Custo: R$ 150 a R$ 350 para recarregar + busca do vazamento se necessário.</p>

<h3>Compressor com defeito</h3>
<p>O compressor é o coração do AC — pressuriza o gás para o ciclo de refrigeração. Sinais de problema: barulho metálico ao ligar o AC, AC que funciona por pouco tempo e para, ou que não liga de jeito nenhum mesmo com gás. Custo de reparo: R$ 600 a R$ 2.000 dependendo do modelo.</p>

<h3>Válvula de expansão</h3>
<p>Controla o fluxo de gás no sistema. Quando falha, o AC pode gelar demais (a saída de ar fica com gelo) ou não gelar. Custo: R$ 200 a R$ 500 com mão de obra.</p>

<h2>Sinal de que é vazamento de gás</h2>

<p>Uma forma simples: ligue o AC e observe se a temperatura do ar que sai é fria mas fraca, ou morna. Se o fluxo está bom mas o ar não é frio, é provável falta de gás. Se o fluxo está fraco, comece pelo filtro de cabine.</p>

<h2>Manutenção preventiva do AC</h2>

<ul>
<li>Troque o filtro de cabine a cada 15.000 km</li>
<li>Ligue o AC pelo menos 1 vez por semana mesmo no inverno — mantém as vedações lubrificadas</li>
<li>Higienize o sistema uma vez por ano (spray higienizador na entrada de ar)</li>
<li>Revisão do AC a cada 2 anos: checagem do nível de gás, limpeza do condensador, verificação das mangueiras</li>
</ul>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-11-01"),
  },

  {
    slug: "troca-de-oleo-de-moto-frequencia-e-custo",
    title: "Troca de óleo de moto: frequência certa, tipo de óleo e quanto custa",
    excerpt: "Troca de óleo é a manutenção mais simples e mais importante da moto. Mas frequência e tipo de óleo errados causam desgaste prematuro. Guia completo para todos os modelos.",
    category: "manutencao" as const,
    contentHtml: `<p>Se tem uma manutenção que nenhum motociclista pode negligenciar, é a troca de óleo. O óleo do motor da moto lubrifica não só o motor, mas também a embreagem (na maioria das motos) e a caixa de câmbio. Um óleo velho ou inadequado desgasta essas três partes ao mesmo tempo.</p>

<h2>Com que frequência trocar?</h2>

<p>A frequência depende do tipo de motor, do tipo de óleo e do uso. Como referência:</p>

<ul>
<li><strong>Óleo mineral:</strong> a cada 3.000 km ou 6 meses</li>
<li><strong>Óleo semissintético:</strong> a cada 4.000 a 5.000 km ou 6 meses</li>
<li><strong>Óleo sintético:</strong> a cada 5.000 a 8.000 km ou 1 ano — sempre verifique o manual</li>
</ul>

<p>Regra geral: o que vier primeiro. Se você andou 2.000 km em 8 meses com óleo mineral, troque pelo tempo mesmo assim.</p>

<h2>Qual óleo usar?</h2>

<p>A classificação de óleo para moto tem uma particularidade importante: você precisa usar óleo com a certificação <strong>JASO MA ou JASO MA2</strong> — específica para motos com embreagem a óleo. Óleo de carro (API SN, SP) pode causar patinagem na embreagem e não deve ser usado.</p>

<p>Viscosidade mais comum:</p>
<ul>
<li>Motos populares (CG 160, Biz, Fan): <strong>10W-30</strong></li>
<li>Motos esportivas e médias: <strong>10W-40</strong></li>
<li>Motos grandes e aventureiras: <strong>15W-50</strong> ou conforme manual</li>
</ul>

<p><strong>Sempre consulte o manual do proprietário</strong> — viscosidade errada pode causar consumo excessivo de óleo ou lubrificação insuficiente.</p>

<h2>Quanto óleo a moto usa?</h2>

<ul>
<li>Motos 100cc a 150cc (CG, Biz, Pop): 0,9 a 1,0 litro</li>
<li>Motos 150cc a 300cc: 1,0 a 1,5 litro</li>
<li>Motos 300cc acima: 1,5 a 3,0 litros (consulte o manual)</li>
</ul>

<h2>Quanto custa?</h2>

<ul>
<li>Óleo mineral 10W-30 JASO MA (1L): R$ 25 a R$ 45</li>
<li>Óleo semissintético 10W-40 JASO MA (1L): R$ 45 a R$ 80</li>
<li>Óleo sintético 10W-40 JASO MA2 (1L): R$ 70 a R$ 130</li>
<li>Filtro de óleo (quando aplicável): R$ 20 a R$ 50</li>
<li>Mão de obra troca de óleo: R$ 30 a R$ 80</li>
</ul>

<h2>Sinais de que o óleo precisa de atenção antes do intervalo</h2>

<ul>
<li>Motor mais barulhento que o normal</li>
<li>Embreagem patinando (rotação sobe mas a moto não acelera proporcionalmente)</li>
<li>Óleo preto e espesso visível na vareta (alguns modelos têm janela de inspeção)</li>
<li>Consumo maior de combustível sem razão aparente</li>
</ul>

<p>Vale lembrar: motos que ficam paradas por mais de 3 meses também devem ter o óleo trocado antes de voltar a rodar — o óleo parado oxida e perde propriedades lubrificantes.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-11-10"),
  },

  {
    slug: "ipva-2027-tudo-que-voce-precisa-saber",
    title: "IPVA 2027: datas de vencimento, como pagar mais barato e isenções",
    excerpt: "O IPVA 2027 começa a vencer em janeiro. Saiba como pagar com desconto, quem tem direito à isenção e como calcular o valor pelo número da placa.",
    category: "novidades" as const,
    contentHtml: `<p>O IPVA — Imposto sobre a Propriedade de Veículos Automotores — é um dos impostos que todo proprietário de veículo precisa quitar anualmente. Em 2027, o calendário de pagamento segue o padrão dos anos anteriores, com vencimentos escalonados pelo final da placa e possibilidade de desconto para quem paga cota única.</p>

<h2>Como funciona o calendário do IPVA</h2>

<p>Cada estado define seu próprio calendário, mas o padrão mais comum segue o final da placa:</p>

<ul>
<li><strong>Placas 1 e 2:</strong> vencem em janeiro</li>
<li><strong>Placas 3 e 4:</strong> vencem em fevereiro</li>
<li><strong>Placas 5 e 6:</strong> vencem em março</li>
<li><strong>Placas 7 e 8:</strong> vencem em abril</li>
<li><strong>Placas 9 e 0:</strong> vencem em maio</li>
</ul>

<p>O calendário exato de cada estado é publicado pela Secretaria da Fazenda estadual em dezembro do ano anterior. Consulte o site do Detran ou da Sefaz do seu estado para as datas precisas de 2027.</p>

<h2>Como pagar com desconto</h2>

<p>A maioria dos estados oferece desconto para quem paga o IPVA em cota única no início do ano:</p>

<ul>
<li><strong>São Paulo:</strong> até 3% de desconto na cota única (consulte o valor exato para 2027)</li>
<li><strong>Rio de Janeiro:</strong> até 3% na cota única</li>
<li><strong>Minas Gerais:</strong> até 3% na cota única</li>
<li><strong>Outros estados:</strong> variam entre 1% e 5% — consulte a Sefaz estadual</li>
</ul>

<p>Além do desconto estadual, muitos bancos oferecem cashback ou parcelamento sem juros no cartão de crédito para o IPVA. Vale pesquisar as ofertas do seu banco em dezembro/janeiro.</p>

<h2>Quem tem direito à isenção de IPVA?</h2>

<p>As isenções variam por estado, mas as mais comuns incluem:</p>

<ul>
<li>Veículos com mais de <strong>20 anos de fabricação</strong> (em alguns estados, 15 anos)</li>
<li>Veículos adaptados para <strong>pessoas com deficiência</strong></li>
<li>Veículos de propriedade de entidades sem fins lucrativos</li>
<li>Táxis e veículos de transporte escolar (em alguns estados)</li>
<li>Veículos elétricos — isenção total em SP, RJ, MG e outros (confirme seu estado)</li>
</ul>

<h2>Como calcular o valor do IPVA</h2>

<p>O IPVA é calculado sobre o valor de mercado do veículo, definido pela tabela FIPE. A alíquota varia por estado e tipo de veículo:</p>

<ul>
<li>São Paulo: 4% para carros de passeio, 2% para motos</li>
<li>Rio de Janeiro: 4% para carros, 2% para motos</li>
<li>Minas Gerais: 4% para carros, 2% para motos</li>
</ul>

<p>Exemplo: carro avaliado em R$ 50.000, alíquota 4% → IPVA = R$ 2.000.</p>

<h2>O que acontece se não pagar?</h2>

<ul>
<li>Multa de mora (varia por estado, geralmente 0,33% ao dia + juros SELIC)</li>
<li>Nome inscrito em dívida ativa estadual</li>
<li>Impedimento de licenciamento e transferência do veículo</li>
<li>Risco de abordagem na fiscalização de trânsito</li>
</ul>

<p>Se não conseguir pagar à vista, parcelamento é sempre melhor que atraso. Verifique as opções no site do Detran do seu estado.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-12-01"),
  },

  {
    slug: "licenciamento-2027-passo-a-passo",
    title: "Licenciamento 2027: passo a passo para não perder o prazo e evitar multa",
    excerpt: "Licenciamento em atraso gera multa e apreensão do veículo. Saiba quando vence, o que precisar pagar antes e como fazer o CRLV sem sair de casa.",
    category: "novidades" as const,
    contentHtml: `<p>O licenciamento anual do veículo é obrigatório no Brasil e garante que o CRLV (Certificado de Registro e Licenciamento de Veículo) esteja válido. Circular sem o licenciamento em dia é infração gravíssima: multa de R$ 293,47, 7 pontos na CNH e risco de retenção do veículo.</p>

<h2>O que é o licenciamento?</h2>

<p>O licenciamento não é apenas um papel — é a confirmação de que você quitou todos os débitos relacionados ao veículo para aquele ano:</p>

<ul>
<li>IPVA (imposto estadual)</li>
<li>DPVAT / SPVAT (seguro obrigatório)</li>
<li>Taxa de licenciamento estadual</li>
<li>Eventuais multas de trânsito pendentes</li>
</ul>

<p>Só com todos esses débitos quitados o CRLV 2027 é emitido.</p>

<h2>Quando vence o licenciamento?</h2>

<p>O prazo de licenciamento segue o calendário estadual, geralmente escalonado pelo final da placa — o mesmo calendário do IPVA. Em São Paulo e na maioria dos estados, o licenciamento do ano vigente precisa ser quitado até o final do mês determinado para a placa.</p>

<p>Consulte o calendário específico do seu estado no site do Detran.</p>

<h2>Passo a passo para o licenciamento 2027</h2>

<ol>
<li><strong>Verifique os débitos:</strong> acesse o site do Detran do seu estado ou o portal do SENATRAN (gov.br/senatran) e consulte todos os débitos pendentes pelo número do RENAVAM</li>
<li><strong>Pague o IPVA:</strong> conforme o calendário estadual, pode ter desconto por pagamento antecipado em cota única</li>
<li><strong>Pague o DPVAT/SPVAT:</strong> seguro obrigatório, valor fixo por categoria de veículo, emitido junto com o boleto de IPVA em muitos estados</li>
<li><strong>Pague a taxa de licenciamento:</strong> taxa estadual, geralmente incluída no mesmo documento do IPVA</li>
<li><strong>Quite multas pendentes:</strong> multas não pagas impedem a emissão do CRLV. Você pode recorrer a multas, mas enquanto o recurso está pendente, a multa ainda bloqueia o licenciamento em alguns estados</li>
<li><strong>Emita o CRLV-e:</strong> após a confirmação de quitação (24 a 48h após o pagamento), acesse o app do Detran do seu estado ou o portal e baixe o CRLV eletrônico</li>
</ol>

<h2>O CRLV digital vale como documento?</h2>

<p>Sim. O CRLV-e (eletrônico) tem validade legal e pode ser apresentado em qualquer abordagem de fiscalização. Você pode salvar no celular pelo aplicativo do Detran do estado ou pelo app CNH Digital.</p>

<h2>Quanto custa o licenciamento?</h2>

<p>O valor varia por estado. Em São Paulo, a taxa de licenciamento em 2026 foi de R$ 86,46 para carros de passeio. Somado ao IPVA e DPVAT, o total pode variar de R$ 200 a R$ 3.000+ dependendo do valor do veículo.</p>

<h2>Dica: alertas de vencimento</h2>

<p>Cadastre seu RENAVAM no site do Detran para receber alertas por email ou SMS quando os débitos estiverem disponíveis. Evita esquecer o prazo.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-12-08"),
  },

  {
    slug: "gnv-vale-a-pena-conta-os-reais",
    title: "GNV vale a pena? O cálculo real de economia e o que ninguém te conta",
    excerpt: "Converter para GNV pode economizar R$ 300 a R$ 600 por mês — mas há custos ocultos que muitos ignoram. Faça o cálculo real antes de instalar.",
    category: "dicas" as const,
    contentHtml: `<p>GNV (Gás Natural Veicular) é o combustível que mais cresceu em popularidade com a alta dos preços da gasolina. A promessa de economizar 50% ou mais no combustível é real — mas há um lado da conta que costuma ficar de fora dos cálculos rápidos. Vamos fazer as contas do jeito certo.</p>

<h2>Como funciona o GNV?</h2>

<p>O GNV é instalado em paralelo ao sistema de combustível original. O carro continua sendo flex ou gasolina — o GNV é adicionado como uma terceira opção. Os cilindros ficam no porta-malas (reduzindo o espaço) e a troca entre os combustíveis é feita automaticamente pelo sistema ou por uma chave manual no painel.</p>

<h2>A economia real</h2>

<p>Para calcular se compensa, você precisa de três números:</p>

<ol>
<li><strong>Consumo médio do carro a gasolina</strong> — ex: 11 km/L</li>
<li><strong>Consumo com GNV</strong> — em média 15% maior que a gasolina: ~9,5 km/m³</li>
<li><strong>Preço do GNV vs. gasolina</strong> — o GNV custa em média 40 a 55% menos por unidade energética equivalente</li>
</ol>

<p><strong>Exemplo de cálculo mensal:</strong></p>
<p>Motorista que roda 2.000 km/mês, gasolina a R$ 6,20, GNV a R$ 4,50/m³:</p>
<ul>
<li>Com gasolina: 2.000 ÷ 11 × R$ 6,20 = <strong>R$ 1.127/mês</strong></li>
<li>Com GNV: 2.000 ÷ 9,5 × R$ 4,50 = <strong>R$ 947/mês</strong></li>
<li>Economia mensal: ~R$ 180</li>
</ul>

<h2>O custo da conversão</h2>

<ul>
<li>Kit GNV 3ª geração (básico, 1 cilindro): R$ 2.500 a R$ 3.500</li>
<li>Kit GNV 5ª geração (injeção sequencial, mais moderno): R$ 3.500 a R$ 5.500</li>
<li>Instalação certificada: incluída no valor acima</li>
<li>Vistoria e aprovação no Detran: R$ 150 a R$ 300</li>
</ul>

<p>Com a economia do exemplo acima (R$ 180/mês), o kit básico se paga em cerca de <strong>16 a 20 meses</strong>.</p>

<h2>O que ninguém te conta: os custos ocultos</h2>

<ul>
<li><strong>Revisão do kit a cada 3 anos ou 30.000 km:</strong> R$ 300 a R$ 600 — obrigatória pelo Detran</li>
<li><strong>Recertificação do cilindro a cada 5 anos:</strong> R$ 200 a R$ 500 (ou troca se reprovado)</li>
<li><strong>Manutenção ligeiramente mais frequente:</strong> injetor de GNV e velas tendem a desgastar um pouco mais</li>
<li><strong>Perda de porta-malas:</strong> o cilindro ocupa de 60 a 150 litros do porta-malas</li>
<li><strong>Postos de abastecimento menos disponíveis</strong> em cidades pequenas</li>
</ul>

<h2>Para quem o GNV faz mais sentido?</h2>

<ul>
<li>Motoristas que rodam mais de 1.500 km/mês</li>
<li>Quem mora em cidade com boa disponibilidade de postos GNV</li>
<li>Taxistas, entregadores e motoristas de app — com rodagem alta, o retorno é mais rápido</li>
</ul>

<p>Para quem roda pouco (menos de 1.000 km/mês), o tempo de payback pode passar de 3 anos e outras opções podem ser mais vantajosas.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2026-12-15"),
  },

  {
    slug: "app-gasolina-mais-barata-perto-de-voce",
    title: "App para achar gasolina mais barata: os melhores e como usar",
    excerpt: "Diferença de R$ 0,30 por litro no combustível pode representar R$ 50 a mais no bolso por mês. Conheça os melhores apps para encontrar o posto mais barato da sua região.",
    category: "dicas" as const,
    contentHtml: `<p>Com o preço da gasolina oscilando constantemente e a diferença entre postos chegando a R$ 0,40 ou mais em uma mesma cidade, saber onde abastecer mais barato é uma economia real e recorrente. Os apps de comparação de preços de combustível fazem exatamente isso — e os melhores já têm avaliações de usuários que confirmam o preço atualizado.</p>

<h2>Os melhores apps para encontrar combustível barato</h2>

<h3>Waze</h3>
<p>O Waze já integra preços de combustível na navegação. Quando você define um destino, ele pode mostrar postos no caminho com os preços reportados pelos usuários. A vantagem é a integração com a rota — você não precisa desviar muito. A desvantagem é que os preços dependem de atualização manual pelos usuários, então podem estar desatualizados.</p>

<h3>Gasolina Mais Barata</h3>
<p>App brasileiro focado exclusivamente em preços de combustível. Mostra mapa com postos próximos e preços reportados pela comunidade, com filtro por tipo de combustível (gasolina comum, aditivada, etanol, diesel, GNV). Interface simples e direta.</p>

<h3>TanqueCheio</h3>
<p>Além de mostrar preços, o TanqueCheio tem histórico de variação dos preços por posto — útil para identificar se um posto costuma ser consistentemente barato ou se é uma promoção pontual.</p>

<h3>Posto Certo</h3>
<p>Permite reportar preços em tempo real e tem sistema de reputação para validar informações. Útil em cidades menores onde a cobertura dos outros apps é menor.</p>

<h2>Dados da ANP — a fonte oficial</h2>

<p>A Agência Nacional do Petróleo (ANP) publica semanalmente a pesquisa de preços de combustíveis por município. Não é um app, mas o site da ANP (gov.br/anp) mostra a média, mínimo e máximo por cidade — útil para saber se o preço que você está pagando está dentro do normal para sua região.</p>

<h2>Quanto dá para economizar?</h2>

<p>Cálculo simples: tanque de 50 litros, diferença de R$ 0,30/L entre o posto mais barato e o mais caro na mesma rua.</p>
<p>R$ 0,30 × 50 = R$ 15 por abastecimento. Abastecendo 3 vezes por mês: <strong>R$ 45 de economia mensal</strong>.</p>

<p>Para motoristas de app ou profissionais que abastecem com mais frequência, a economia pode passar de R$ 100 a R$ 200 por mês.</p>

<h2>Dicas para maximizar a economia</h2>

<ul>
<li><strong>Abasteça mais cedo na semana</strong> — preços tendem a subir nas sextas antes de feriados prolongados</li>
<li><strong>Evite postos em rodovias e aeroportos</strong> — markup tipicamente 10 a 20% maior</li>
<li><strong>Verifique se o etanol compensa</strong> (regra dos 70%) antes de escolher o combustível</li>
<li><strong>Combine com cashback</strong> — alguns postos têm parcerias com programas como Méliuz, C6 Bank, ou cartões específicos</li>
<li><strong>Nunca abasteça com o tanque no limite</strong> — você fica à mercê do posto mais próximo, não do mais barato</li>
</ul>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2027-01-20"),
  },

  {
    slug: "carro-eletrico-gasta-menos-em-manutencao",
    title: "Carro elétrico realmente gasta menos em manutenção? A resposta honesta",
    excerpt: "Elétricos não têm óleo de motor, correia dentada ou embreagem — mas têm outros custos. Comparação real entre manutenção de elétrico e combustão no Brasil.",
    category: "novidades" as const,
    contentHtml: `<p>Um dos grandes argumentos de venda do carro elétrico é o menor custo de manutenção. É verdade — mas com asteriscos importantes. Para quem está avaliando a transição, entender o que realmente muda na manutenção ajuda a tomar a decisão certa.</p>

<h2>O que o elétrico não tem (e que poupa dinheiro)</h2>

<ul>
<li><strong>Óleo do motor:</strong> não existe motor a combustão, portanto sem troca de óleo</li>
<li><strong>Correia dentada e kit de distribuição:</strong> não existem</li>
<li><strong>Embreagem:</strong> transmissão automática sem embreagem convencional</li>
<li><strong>Velas de ignição:</strong> não existem</li>
<li><strong>Filtro de combustível e ar de admissão (motor):</strong> não existem</li>
<li><strong>Escapamento completo (catalisador, silencioso):</strong> não existem</li>
</ul>

<p>Em um carro a combustão popular, a soma dessas manutenções ao longo de 100.000 km pode representar R$ 5.000 a R$ 12.000. O elétrico elimina todos esses itens.</p>

<h2>O que o elétrico ainda tem (e que custa dinheiro)</h2>

<ul>
<li><strong>Pneus:</strong> elétricos são mais pesados, o que aumenta o desgaste dos pneus em 10 a 20%</li>
<li><strong>Freios:</strong> sistemas de frenagem regenerativa reduzem muito o desgaste de pastilhas e discos — mas ainda existem</li>
<li><strong>Fluido de freio:</strong> troca a cada 2 anos, como em qualquer carro</li>
<li><strong>Ar-condicionado:</strong> sistema próprio, manutenção similar ao carro convencional</li>
<li><strong>Filtro de cabine:</strong> troca regular necessária</li>
<li><strong>Software e atualizações:</strong> alguns fabricantes cobram por funcionalidades via OTA</li>
</ul>

<h2>O custo que ninguém calcula: a bateria</h2>

<p>A bateria de alta tensão do elétrico tem vida útil estimada de 8 a 15 anos ou 150.000 a 300.000 km, dependendo do fabricante e das condições de uso. Quando precisa de substituição, o custo é alto:</p>

<ul>
<li>Bateria de EV popular (BYD Dolphin, Volvo EX30): R$ 30.000 a R$ 60.000</li>
<li>Bateria de EV premium: R$ 60.000 a R$ 150.000</li>
</ul>

<p>A maioria dos fabricantes oferece garantia de 8 anos ou 160.000 km para a bateria. Fora da garantia, a conta pode mudar a equação.</p>

<h2>Comparação real de custo de manutenção</h2>

<p>Estimativa para 5 anos / 80.000 km no Brasil (2025/2026):</p>

<ul>
<li><strong>Carro popular a combustão:</strong> R$ 8.000 a R$ 15.000 em manutenção</li>
<li><strong>Carro elétrico popular:</strong> R$ 2.000 a R$ 4.000 em manutenção (excluindo bateria)</li>
</ul>

<p>A economia na manutenção é real e significativa no médio prazo.</p>

<h2>Para quem o elétrico faz mais sentido hoje no Brasil?</h2>

<ul>
<li>Moradores de grandes centros com infraestrutura de carregamento</li>
<li>Quem tem carregamento em casa ou no trabalho</li>
<li>Uso predominantemente urbano (sem longas viagens frequentes)</li>
<li>Plano de uso de pelo menos 5 anos (amortizar o custo de aquisição maior)</li>
</ul>

<p>O mercado de elétricos no Brasil ainda está amadurecendo — rede de assistência técnica especializada, peças e infraestrutura de recarga ainda são limitações reais fora das capitais.</p>`,
    status: "PUBLISHED" as const,
    publishAt: new Date("2027-02-15"),
  },
];

async function main() {
  console.log(`Inserindo ${posts.length} posts...`);
  for (const post of posts) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`⚠  Já existe: ${post.slug} — pulando`);
      continue;
    }
    await prisma.post.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        contentHtml: post.contentHtml,
        status: post.status,
        publishAt: post.publishAt,
      },
    });
    console.log(`✅  ${post.publishAt.toISOString().slice(0, 10)} — ${post.slug}`);
  }
  console.log("\nPronto!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
