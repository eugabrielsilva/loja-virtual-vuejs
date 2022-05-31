const app = {

    // Dados iniciais
    data() {
        return {
            alerta: false,

            carrinho: {
                produtos: [],
                subtotal: 0,
                quantidade: 0
            },

            produtos: [
                {
                    id: 1,
                    titulo: 'FIFA 22',
                    preco: 250,
                    descricao: 'Jogo completo em mídia digital',
                    imagem: 'fifa.jpg'
                },

                {
                    id: 2,
                    titulo: 'GTA V',
                    preco: 49.99,
                    descricao: 'Premium Edition',
                    imagem: 'gta.jpg'
                },

                {
                    id: 3,
                    titulo: 'Stardew Valley',
                    preco: 24.99,
                    descricao: 'Jogo completo em mídia digital',
                    imagem: 'stardew.jpg'
                },

                {
                    id: 4,
                    titulo: 'Skyrim',
                    preco: 24.99,
                    descricao: 'Anniversary Edition',
                    imagem: 'skyrim.jpg'
                },

                {
                    id: 5,
                    titulo: 'F1 2020',
                    preco: 127.99,
                    descricao: 'Deluxe Schumacher Edition',
                    imagem: 'f1.jpg'
                },

                {
                    id: 6,
                    titulo: 'Besiege',
                    preco: 9.85,
                    descricao: 'Jogo base',
                    imagem: 'besiege.jpg'
                },

                {
                    id: 7,
                    titulo: 'No Man\'s Sky',
                    preco: 64.99,
                    descricao: 'Jogo base',
                    imagem: 'nomans.jpg'
                },

                {
                    id: 8,
                    titulo: 'Flight Simulator',
                    preco: 249.95,
                    descricao: 'Game of the Year Edition',
                    imagem: 'fsx.jpg'
                }
            ]
        }
    },

    mounted() {

        // Obter dados do local storage
        let localData = window.localStorage.getItem('carrinho');
        if(localData) this.carrinho = JSON.parse(localData);

    },

    methods: {

        // Verificar existência de produto no carrinho
        verificarProduto(id) {
            return this.carrinho.produtos.find(produto => produto.id === id);
        },

        // Adicionar produto ao carrinho
        adicionarProduto(key) {
            let produto = this.produtos[key];
            let produtoExistente = this.verificarProduto(produto.id);

            if(produtoExistente) {
                produtoExistente.quantidade++;
                produtoExistente.total += produto.preco;
            } else {
                this.carrinho.produtos.push({
                    ...produto,
                    quantidade: 1,
                    total: produto.preco
                });
            }

            this.carrinho.quantidade++;
            this.carrinho.subtotal += produto.preco;

            this.alerta = true;
            setTimeout(() => {
                this.alerta = false;
            }, 1500);
        },

        // Aumentar quantidade do produto
        aumentarQtdProduto(key) {
            let produto = this.carrinho.produtos[key];
            produto.quantidade++;
            produto.total += produto.preco;
            this.carrinho.quantidade++;
            this.carrinho.subtotal += produto.preco;
        },

        // Diminuir quantidade do produto
        diminuirQtdProduto(key) {
            let produto = this.carrinho.produtos[key];
            if(produto.quantidade > 1) {
                produto.quantidade--;
                produto.total -= produto.preco;
                this.carrinho.quantidade--;
                this.carrinho.subtotal -= produto.preco;
            } else {
                this.removerProduto(key);
            }
        },

        // Remover produto do carrinho
        removerProduto(key) {
            let produto = this.carrinho.produtos[key];
            this.carrinho.produtos.splice(key, 1);
            this.carrinho.quantidade -= produto.quantidade;
            this.carrinho.subtotal -= produto.total;
        }

    },

    watch: {

        // Salvar alterações do carrinho no local storage
        carrinho: {
            handler() {
                window.localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
            },
            deep: true
        }
    }
};

// Inicializar aplicação Vue
Vue.createApp(app).mount('#app');