const config = {
    type: Phaser.AUTO,

    width: 1280,
    height: 720,

    parent: 'game-container',

    backgroundColor: '#000000',

    pixelArt: true,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',

        arcade: {
            debug: false
        }
    },

    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

let player;
let medico;

let estetoscopio;
let luvas;
let termometro;
let vacina;
let laudo;
let remedio;
let medalha;
let botaoReiniciar;
let botaoInicio;

let estetoscopioPosY = 390;
let luvasPosY = 200;
let termometroPosY = 579;
let vacinaPosY = 300;
let laudoPosY = 550;
let remedioPosY = 650;

let cursors;
let map;

let interactionKey;

let dialogueBox;
let dialogueText;
let interactionText;
let npcIndicator;

let isDialogueActive = false;

let missaoLiberada = false;

let playerNearNpc = false;

let jogoFinalizado = false;

let mensagemFinalExibida = false;

let playerNearEstetoscopio = false;
let playerNearLuvas = false;
let playerNearTermometro = false;
let playerNearVacina = false;
let playerNearLaudo = false;
let playerNearRemedio = false;

let currentDialogue = 0;


// CONTADOR

let explorationBox;
let explorationText;

let itensDescobertos = 0;

const totalItens = 6;


// ITENS DESCOBERTOS

let estetoscopioDescoberto = false;
let luvasDescobertas = false;
let termometroDescoberto = false;
let vacinaDescoberta = false;
let laudoDescoberto = false;
let remedioDescoberto = false;


// DIÁLOGOS

const dialogues = [

    "Dr. Lumen: Oi explorador!",

    "Dr. Lumen: Quer descobrir os instrumentos mágicos do consultório?",

    "Dr. Lumen: Aqui existem muitas coisas incríveis para aprender!",

    "Dr. Lumen: Use sua coragem e me ajude a encontrar os itens escondidos!",

    "Dr. Lumen: Quando encontrar algo interessante, pressione E para coletar!",

    "Dr. Lumen: Quando encontrar todos os itens, volte até mim!",

    "Dr. Lumen: E você ganhará a medalha de explorador do consultório!"
];

function preload() {

    this.load.image(
        'hospital',
        'assets/maps/hospital_consultorio.jpg'
    );

    this.load.image(
        'player',
        'assets/sprites/jogador_masculino.png'
    );

    this.load.image(
        'medico',
        'assets/sprites/Dr.LumenFrente.png'
    );

    this.load.image(
        'estetoscopio',
        'assets/sprites/estetoscopio.png'
    );

    this.load.image(
        'luvas',
        'assets/sprites/luvas.png'
    );

    this.load.image(
        'termometro',
        'assets/sprites/termometro.png'
    );

    this.load.image(
        'vacina',
        'assets/sprites/vacina.png'
    );

    this.load.image(
        'laudo',
        'assets/sprites/laudo.png'
    );

    this.load.image(
        'remedio',
        'assets/sprites/remedio.png'
    );

    this.load.image(
    'medalha',
    'assets/sprites/medalha.png'
);
}

function create() {

    // MAPA

    map = this.add.image(0, 0, 'hospital')
        .setOrigin(0);


    // PLAYER

    player = this.physics.add.sprite(
        618,
        700,
        'player'
    );

    player.setScale(0.3);


    // MÉDICO

    medico = this.physics.add.staticSprite(
        860,
        397,
        'medico'
    );

    medico.setScale(0.7);


    // ESTETOSCÓPIO

    estetoscopio = this.physics.add.staticSprite(
        600,
        estetoscopioPosY,
        'estetoscopio'
    );

    estetoscopio.setScale(0.06);


    // LUVAS

    luvas = this.physics.add.staticSprite(
        985,
        luvasPosY,
        'luvas'
    );

    luvas.setScale(0.09);


    // TERMÔMETRO

    termometro = this.physics.add.staticSprite(
        1169,
        termometroPosY,
        'termometro'
    );

    termometro.setScale(0.08);


    // VACINA

    vacina = this.physics.add.staticSprite(
        300,
        vacinaPosY,
        'vacina'
    );

    vacina.setScale(0.08);


    // LAUDO

    laudo = this.physics.add.staticSprite(
        170,
        laudoPosY,
        'laudo'
    );

    laudo.setScale(0.04);


    // REMÉDIO

    remedio = this.physics.add.staticSprite(
        870,
        remedioPosY,
        'remedio'
    );

    remedio.setScale(0.05);


    // LIMITES

    player.setCollideWorldBounds(true);

    this.physics.world.setBounds(
        0,
        0,
        map.width,
        map.height
    );


    // CÂMERA

    this.cameras.main.startFollow(player);

    this.cameras.main.setBounds(
        0,
        0,
        map.width,
        map.height
    );

    this.cameras.main.setZoom(1.2);


    // CONTROLES

    cursors = this.input.keyboard.createCursorKeys();

    interactionKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.E
    );


    // TEXTO INTERAÇÃO

    interactionText = this.add.text(
        122,
        85,
        '',
        {
            fontSize: '22px',
            color: '#000000',
            backgroundColor: '#f5e6c8',

            padding: {
                left: 12,
                right: 12,
                top: 8,
                bottom: 8
            }
        }
    );

    interactionText.setScrollFactor(0);
    interactionText.setDepth(999);
    interactionText.setVisible(false);


    // CONTADOR FUNDO

    explorationBox = this.add.rectangle(
        999,
        100,
        300,
        60,
        0xf5e6c8,
        1
    );

    explorationBox.setStrokeStyle(
        3,
        0x000000
    );

    explorationBox.setScrollFactor(0);
    explorationBox.setDepth(999);


    // CONTADOR TEXTO

    explorationText = this.add.text(
        910,
        83,
        `Exploração: 0/${totalItens}`,
        {
            fontSize: '26px',
            fontFamily: 'Arial',
            color: '#000000'
        }
    );

    explorationText.setScrollFactor(0);
    explorationText.setDepth(1000);


    // INDICADOR NPC

    npcIndicator = this.add.text(
        medico.x,
        medico.y - 90,
        '!',
        {
            fontSize: '42px',
            color: '#ffff00',
            fontStyle: 'bold'
        }
    );

    npcIndicator.setOrigin(0.5);


    // CAIXA DIÁLOGO

    dialogueBox = this.add.rectangle(
        640,
        620,
        980,
        150,
        0xf5e6c8,
        0.98
    );

    dialogueBox.setStrokeStyle(
        4,
        0x000000
    );

    dialogueBox.setScrollFactor(0);
    dialogueBox.setDepth(999);


    // TEXTO DIÁLOGO

    dialogueText = this.add.text(
        190,
        578,
        '',
        {
            fontSize: '24px',
            color: '#000000',
            fontFamily: 'Arial',

            wordWrap: {
                width: 900
            },

            lineSpacing: 10
        }
    );

    dialogueText.setScrollFactor(0);
    dialogueText.setDepth(1000);


    // ESCONDER DIÁLOGO

    dialogueBox.setVisible(false);
    dialogueText.setVisible(false);

    // MEDALHA FINAL

medalha = this.add.image(
    640,
    260,
    'medalha'
);

medalha.setScale(0.4);

medalha.setScrollFactor(0);

medalha.setDepth(2000);

medalha.setVisible(false);



// BOTÃO REINICIAR

botaoReiniciar = this.add.text(
    220,
    520,
    'Reiniciar Jogo',
    {
        fontSize: '32px',
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        padding: {
            left: 20,
            right: 20,
            top: 10,
            bottom: 10
        }
    }
);

botaoReiniciar.setInteractive();

botaoReiniciar.setScrollFactor(0);

botaoReiniciar.setDepth(2000);

botaoReiniciar.setVisible(false);


// BOTÃO VOLTAR AO INÍCIO

botaoInicio = this.add.text(
    560,
    520,
    'Voltar para o Início',
    {
        fontSize: '32px',
        backgroundColor: '#2196F3',
        color: '#ffffff',
        padding: {
            left: 20,
            right: 20,
            top: 10,
            bottom: 10
        }
    }
);

botaoInicio.setInteractive();

botaoInicio.setScrollFactor(0);

botaoInicio.setDepth(2000);

botaoInicio.setVisible(false);


// AÇÃO REINICIAR

botaoReiniciar.on('pointerdown', () => {

    location.reload();
});


// AÇÃO VOLTAR AO INÍCIO

botaoInicio.on('pointerdown', () => {

    window.location.href = 'conhecer_ambiente.html';
});



}

function update() {

    const speed = 220;


    // DISTÂNCIAS

    const distanceNpc = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        medico.x,
        medico.y
    );

    const distanceEstetoscopio = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        estetoscopio.x,
        estetoscopio.y
    );

const distanceVacina = Phaser.Math.Distance.Between(
    player.x,
    player.y,
    vacina.x,
    vacina.y
);

const distanceTermometro = Phaser.Math.Distance.Between(
    player.x,
    player.y,
    termometro.x,
    termometro.y
);

const distanceLuvas = Phaser.Math.Distance.Between(
    player.x,
    player.y,
    luvas.x,
    luvas.y
);

const distanceLaudo = Phaser.Math.Distance.Between(
    player.x,
    player.y,
    laudo.x,
    laudo.y
);


const distanceRemedio = Phaser.Math.Distance.Between(
    player.x,
    player.y,
    remedio.x,
    remedio.y
);


    // PROXIMIDADE NPC

    if (distanceNpc < 140) {

        playerNearNpc = true;

        interactionText.setText(
            'Pressione E para conversar'
        );

        interactionText.setVisible(true);

    } else {

        playerNearNpc = false;
    }


    // PROXIMIDADE ESTETOSCÓPIO

    if (
    missaoLiberada
    &&
    distanceEstetoscopio < 100
    &&
    !estetoscopioDescoberto
) {

    playerNearEstetoscopio = true;

    interactionText.setText(
        'Pressione E para coletar'
    );

    interactionText.setVisible(true);

} else {

    playerNearEstetoscopio = false;
}


    // PROXIMIDADE VACINA

if (
    missaoLiberada
    &&
    distanceVacina < 100
    &&
    !vacinaDescoberta
) {

    playerNearVacina = true;

    interactionText.setText(
        'Pressione E para coletar'
    );

    interactionText.setVisible(true);

} else {

    playerNearVacina = false;
}


// proximidade termometro 

if (
    missaoLiberada
    &&
    distanceTermometro < 100
    &&
    !termometroDescoberto
) {

    playerNearTermometro = true;

    interactionText.setText(
        'Pressione E para coletar'
    );

    interactionText.setVisible(true);

} else {

    playerNearTermometro = false;
}


// PROXIMIDADE LUVAS

if (
    missaoLiberada
    &&
    distanceLuvas < 100
    &&
    !luvasDescobertas
) {

    playerNearLuvas = true;

    interactionText.setText(
        'Pressione E para coletar'
    );

    interactionText.setVisible(true);

} else {

    playerNearLuvas = false;
}

// PROXIMIDADE LAUDO

if (
    missaoLiberada
    &&
    distanceLaudo < 100
    &&
    !laudoDescoberto
) {

    playerNearLaudo = true;

    interactionText.setText(
        'Pressione E para coletar'
    );

    interactionText.setVisible(true);

} else {

    playerNearLaudo = false;
}

// Proximidade remedio 

if (missaoLiberada
    &&
    distanceRemedio < 100
    &&
    !remedioDescoberto
) {

    playerNearRemedio = true;

    interactionText.setText(
        'Pressione E para coletar'
    );

    interactionText.setVisible(true);

} else {

    playerNearRemedio = false;
}


    // ESCONDER TEXTO

if (
    !playerNearNpc
    &&
    !playerNearEstetoscopio
    &&
    !playerNearVacina
    &&
    !playerNearTermometro
    &&
    !playerNearLuvas
    &&
    !playerNearLaudo
    &&
    !playerNearRemedio
)
 {

    interactionText.setVisible(false);
}

// PROXIMIDADE TERMÔMETRO

if (
    distanceTermometro < 100
    &&
    !termometroDescoberto
) {

    playerNearTermometro = true;

    interactionText.setText(
        'Pressione E para coletar'
    );

    interactionText.setVisible(true);

} else {

    playerNearTermometro = false;
}


    // MOVIMENTO

    if (!isDialogueActive) {

        player.setVelocity(0);

        if (cursors.left.isDown) {
            player.setVelocityX(-speed);
        }

        else if (cursors.right.isDown) {
            player.setVelocityX(speed);
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-speed);
        }

        else if (cursors.down.isDown) {
            player.setVelocityY(speed);
        }
    }


 // INTERAÇÕES

if (Phaser.Input.Keyboard.JustDown(interactionKey)) {

    // MÉDICO

    if (playerNearNpc) {

        if (!isDialogueActive) {

            startDialogue();

        } else {

            nextDialogue();
        }
    }

    // ESTETOSCÓPIO

    else if (
        playerNearEstetoscopio
        &&
        !estetoscopioDescoberto
    ) {

        descobrirEstetoscopio();
    }

    // LUVAS

    else if (
        playerNearLuvas
        &&
        !luvasDescobertas
    ) {

        descobrirLuvas();
    }

    // TERMÔMETRO

    else if (
        playerNearTermometro
        &&
        !termometroDescoberto
    ) {

        descobrirTermometro();
    }

    // VACINA

    else if (
        playerNearVacina
        &&
        !vacinaDescoberta
    ) {

        descobrirVacina();
    }

    // LAUDO

    else if (
        playerNearLaudo
        &&
        !laudoDescoberto
    ) {

        descobrirLaudo();
    }

    // REMÉDIO

    else if (
        playerNearRemedio
        &&
        !remedioDescoberto
    ) {

        descobrirRemedio();
    }

    // FECHAR DIÁLOGO DOS ITENS

    else if (isDialogueActive) {

        endDialogue();
    }
}

    // FECHAR DIÁLOGO DO ITEM

    else if (
        Phaser.Input.Keyboard.JustDown(interactionKey)
        &&
        isDialogueActive
        &&
        !playerNearNpc
    ) {

        fecharDialogoItem();
    }


    // ANIMAÇÃO NPC

    npcIndicator.y =
        medico.y - 90 +
        Math.sin(Date.now() * 0.005) * 5;


// ANIMAÇÃO ESTETOSCÓPIO

if (!estetoscopioDescoberto) {

    estetoscopio.y =
        estetoscopioPosY +
        Math.sin(Date.now() * 0.005) * 5;
}


// ANIMAÇÃO VACINA

if (!vacinaDescoberta) {

    vacina.y =
        vacinaPosY +
        Math.sin(Date.now() * 0.005) * 5;
}

if (!termometroDescoberto) {

    termometro.y =
        termometroPosY +
        Math.sin(Date.now() * 0.005) * 5;
}

// ANIMAÇÃO LUVAS

if (!luvasDescobertas) {

    luvas.y =
        luvasPosY +
        Math.sin(Date.now() * 0.005) * 5;
}

// ANIMAÇÃO LAUDO

if (!laudoDescoberto) {

    laudo.y =
        laudoPosY +
        Math.sin(Date.now() * 0.005) * 5;
}

// ANIMAÇÃO REMÉDIO

if (!remedioDescoberto) {

    remedio.y =
        remedioPosY +
        Math.sin(Date.now() * 0.005) * 5;
}


}

// ANIMAÇÃO TERMÔMETRO

if (!termometroDescoberto) {

    termometro.y =
        termometroPosY +
        Math.sin(Date.now() * 0.005) * 5;
}

// CONTADOR

function atualizarContador() {

    explorationText.setText(
        `Exploração: ${itensDescobertos}/${totalItens}`
    );

    // MENSAGEM FINAL

    if (
        itensDescobertos === totalItens
        &&
        !mensagemFinalExibida
    ) {

        mensagemFinalExibida = true;

        isDialogueActive = true;

        dialogueBox.setVisible(true);

        dialogueText.setVisible(true);

        dialogueText.setText(
            "Parabéns! Você encontrou todos os itens! " +
            "Agora volte até o Dr. Lumen para receber sua medalha!"
        );
    }
}


// DIÁLOGOS NPC

function startDialogue() {

    isDialogueActive = true;

    dialogueBox.setVisible(true);

    dialogueText.setVisible(true);

    interactionText.setVisible(false);


    // FINAL DO JOGO

    if (
        itensDescobertos === totalItens
        &&
        !jogoFinalizado
        &&
        mensagemFinalExibida
    ) {

        dialogueText.setText(
            "Dr. Lumen: Incrível explorador! " +
            "Você encontrou todos os instrumentos do consultório! " +
            "Por sua coragem e dedicação, você recebeu a Medalha de Bravura Médica! 🏅"
        );

        jogoFinalizado = true;

        npcIndicator.setVisible(false);

        // MOSTRAR MEDALHA

        medalha.setVisible(true);


        return;
    }


    // DIÁLOGO NORMAL INICIAL

    currentDialogue = 0;

    dialogueText.setText(
        dialogues[currentDialogue]
    );
}

function nextDialogue() {

    currentDialogue++;

    if (currentDialogue >= dialogues.length) {

        endDialogue();

        return;
    }

    dialogueText.setText(
        dialogues[currentDialogue]
    );
}

function endDialogue() {

    isDialogueActive = false;

    dialogueBox.setVisible(false);

    dialogueText.setVisible(false);

    // MOSTRAR BOTÕES SOMENTE APÓS FECHAR O ÚLTIMO DIÁLOGO

    if (jogoFinalizado) {

        botaoReiniciar.setVisible(true);

        botaoInicio.setVisible(true);
    }

    if (!jogoFinalizado) {

        missaoLiberada = true;
    }
}

// FECHAR DIÁLOGO ITEM

function fecharDialogoItem() {

    isDialogueActive = false;

    dialogueBox.setVisible(false);

    dialogueText.setVisible(false);
}


// DESCOBRIR ESTETOSCÓPIO

function descobrirEstetoscopio() {

    estetoscopioDescoberto = true;

    itensDescobertos++;

    atualizarContador();

    isDialogueActive = true;

    dialogueBox.setVisible(true);

    dialogueText.setVisible(true);

    // ÚLTIMO ITEM

    if (itensDescobertos === totalItens) {

        dialogueText.setText(
            "Parabéns! Você encontrou todos os itens! " +
            "Agora volte até o Dr. Lumen para receber sua medalha!"
        );

    } else {

        dialogueText.setText(
            "Parabéns! Você acabou de descobrir algo! " +
            "O estetoscópio ajuda os médicos a ouvirem o coração fazendo tum tum " +
            "e também a escutarem a respiração das pessoas!"
        );
    }

    estetoscopio.setVisible(false);

    interactionText.setVisible(false);
}

function descobrirVacina() {

    vacinaDescoberta = true;

    itensDescobertos++;

    atualizarContador();

    isDialogueActive = true;

    dialogueBox.setVisible(true);

    dialogueText.setVisible(true);

    // ÚLTIMO ITEM

    if (itensDescobertos === totalItens) {

        dialogueText.setText(
            "Parabéns! Você encontrou todos os itens! " +
            "Agora volte até o Dr. Lumen para receber sua medalha!"
        );

    } else {

        dialogueText.setText(
            "Parabéns! Você encontrou uma Vacina! " +
            "Ela ajuda a proteger as pessoas contra doenças e deixar todo mundo mais saudável!"
        );
    }

    vacina.setVisible(false);

    interactionText.setVisible(false);
}


function descobrirTermometro() {

    termometroDescoberto = true;

    itensDescobertos++;

    atualizarContador();

    isDialogueActive = true;

    dialogueBox.setVisible(true);

    dialogueText.setVisible(true);

    // ÚLTIMO ITEM

    if (itensDescobertos === totalItens) {

        dialogueText.setText(
            "Parabéns! Você encontrou todos os itens! " +
            "Agora volte até o Dr. Lumen para receber sua medalha!"
        );

    } else {

        dialogueText.setText(
            "Parabéns! Você encontrou um Termômetro! " +
            "Ele ajuda os médicos a medirem a temperatura do corpo das pessoas!"
        );
    }

    termometro.setVisible(false);

    interactionText.setVisible(false);
}

function descobrirLuvas() {

    luvasDescobertas = true;

    itensDescobertos++;

    atualizarContador();

    isDialogueActive = true;

    dialogueBox.setVisible(true);

    dialogueText.setVisible(true);

    // ÚLTIMO ITEM

    if (itensDescobertos === totalItens) {

        dialogueText.setText(
            "Parabéns! Você encontrou todos os itens! " +
            "Agora volte até o Dr. Lumen para receber sua medalha!"
        );

    } else {

        dialogueText.setText(
            "Parabéns! Você encontrou Luvas Médicas! " +
            "As luvas ajudam os médicos a manter tudo limpo e protegido durante o atendimento!"
        );
    }

    luvas.setVisible(false);

    interactionText.setVisible(false);
}


function descobrirLaudo() {

    laudoDescoberto = true;

    itensDescobertos++;

    atualizarContador();

    isDialogueActive = true;

    dialogueBox.setVisible(true);

    dialogueText.setVisible(true);

    // ÚLTIMO ITEM

    if (itensDescobertos === totalItens) {

        dialogueText.setText(
            "Parabéns! Você encontrou todos os itens! " +
            "Agora volte até o Dr. Lumen para receber sua medalha!"
        );

    } else {

        dialogueText.setText(
            "Parabéns! Você encontrou um Laudo Médico! " +
            "O laudo ajuda os médicos a registrarem informações importantes sobre a saúde dos pacientes!"
        );
    }

    laudo.setVisible(false);

    interactionText.setVisible(false);
}


function descobrirRemedio() {

    remedioDescoberto = true;

    itensDescobertos++;

    atualizarContador();

    isDialogueActive = true;

    dialogueBox.setVisible(true);

    dialogueText.setVisible(true);

    // ÚLTIMO ITEM

    if (itensDescobertos === totalItens) {

        dialogueText.setText(
            "Parabéns! Você encontrou todos os itens! " +
            "Agora volte até o Dr. Lumen para receber sua medalha!"
        );

    } else {

        dialogueText.setText(
            "Parabéns! Você encontrou um Remédio! " +
            "Os remédios ajudam as pessoas a melhorarem quando estão doentes!"
        );
    }

    remedio.setVisible(false);

    interactionText.setVisible(false);
}