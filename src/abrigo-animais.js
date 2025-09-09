class AbrigoAnimais {
	constructor() {
		this.animais = [
			{ nome: "Rex", raca: "CÃO", brinquedos: ["RATO", "BOLA"] },
			{ nome: "Mimi", raca: "GATO", brinquedos: ["BOLA", "LASER"] },
			{ nome: "Fofo", raca: "GATO", brinquedos: ["BOLA", "RATO", "LASER"] },
			{ nome: "Zero", raca: "GATO", brinquedos: ["RATO", "BOLA"] },
			{ nome: "Bola", raca: "CÃO", brinquedos: ["CAIXA", "NOVELO"] },
			{ nome: "Bebe", raca: "CÃO", brinquedos: ["LASER", "RATO", "BOLA"] },
			{ nome: "Loco", raca: "JABUTI", brinquedos: ["SKATE", "RATO"] }
		]

		this.todosBrinquedos = [
			"RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"
		]
	}

	encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
		try {
			const listaP1 = brinquedosPessoa1.split(",").map(b => b.trim().toUpperCase())
			const listaP2 = brinquedosPessoa2.split(",").map(b => b.trim().toUpperCase())
			const ordem = ordemAnimais.split(",").map(a => a.trim())

			if (!this.validaAnimais(ordem)) return { erro: "Animal inválido" }

			if (!this.validaBrinquedos(listaP1) || !this.validaBrinquedos(listaP2)) return { erro: "Brinquedo inválido" }

			let adocoes = []
			let contagemP1 = 0
			let contagemP2 = 0

			for (const nomeAnimal of ordem) {
				const animal = this.animais.find(a => a.nome.toUpperCase() === nomeAnimal.toUpperCase())

				const p1Serve = this.temBrinquedos(listaP1, animal)
				const p2Serve = this.temBrinquedos(listaP2, animal)

				let dono = "abrigo"

				const p1PodeAdotar = p1Serve && contagemP1 < 3
				const p2PodeAdotar = p2Serve && contagemP2 < 3

				if (p1PodeAdotar && p2PodeAdotar) {
					dono = "abrigo"
				} else if (p1PodeAdotar) {
					if (animal.nome === "Loco" && contagemP1 === 0) {
						dono = "abrigo"
					} else {
						dono = "pessoa 1"
						contagemP1++
					}
				} else if (p2PodeAdotar) {
					if (animal.nome === "Loco" && contagemP2 === 0) {
						dono = "abrigo"
					} else {
						dono = "pessoa 2"
						contagemP2++
					}
				}
				adocoes.push(`${animal.nome} - ${dono}`)
			}

			adocoes.sort()

			return { lista: adocoes }
		} catch (err) {
			return { erro: "Erro inesperado nos parâmetros de entrada" }
		}
	}

	validaBrinquedos(brinquedos) {
		const set = new Set(brinquedos)
		if (set.size !== brinquedos.length) return false
		return brinquedos.every(b => this.todosBrinquedos.includes(b))
	}

	validaAnimais(ordem) {
		const nomesValidos = this.animais.map(a => a.nome.toUpperCase())
		const upper = ordem.map(o => o.toUpperCase())
		const set = new Set(upper)
		if (set.size !== ordem.length) return false
		return upper.every(o => nomesValidos.includes(o))
	}

	temBrinquedos(listaPessoa, animal) {
		if (animal.raca === "JABUTI") {
			return animal.brinquedos.every(b => listaPessoa.includes(b))
		}

		let ultimoIndex = -1;
		for (const brinquedo of animal.brinquedos) {
			const indexAtual = listaPessoa.indexOf(brinquedo, ultimoIndex + 1)
			if (indexAtual === -1) {
				return false
			}
			ultimoIndex = indexAtual
		}
		return true
	}
}

export { AbrigoAnimais as AbrigoAnimais }