# Projeto 04 HC


## 📌 Sobre o Projeto



---

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- PWA (Progressive Web App)
- Node.js
- RESTful APIs
- Flutter (cross-platform)
- Banco relacional (SQL)

# 🚀 Padrões de Desenvolvimento

Este repositório segue convenções para **branches** e **commits**,
garantindo organização, rastreabilidade e colaboração eficiente.

------------------------------------------------------------------------

## 🌿 Padrão de Branches

### 📌 Estrutura

As branches devem seguir o seguinte padrão:

    tipo/nome-da-feature

### 📂 Tipos de branch

-   `feature/` → nova funcionalidade\
-   `fix/` → correção de bugs\
-   `hotfix/` → correção urgente em produção\
-   `refactor/` → melhoria de código sem alterar comportamento\
-   `docs/` → alterações na documentação\
-   `test/` → criação ou ajuste de testes

### ✅ Exemplos

    feature/login-usuario
    fix/erro-validacao-email
    hotfix/corrige-crash-producao
    refactor/melhora-performance-consulta
    docs/atualiza-readme

------------------------------------------------------------------------

## 🔀 Fluxo de Trabalho

1.  Sempre partir da branch `main` atualizada:

``` bash
git checkout main
git pull origin main
```

2.  Criar uma nova branch:

``` bash
git checkout -b feature/minha-feature
```

3.  Após finalizar:

``` bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/minha-feature
```

4.  Abrir um **Pull Request**

------------------------------------------------------------------------

## 📝 Padrão de Commits

Seguimos o padrão **Conventional Commits**:

    tipo: descrição curta

### 📌 Tipos de commit

-   `feat:` → nova funcionalidade\
-   `fix:` → correção de bug\
-   `docs:` → documentação\
-   `style:` → formatação (sem alteração de lógica)\
-   `refactor:` → refatoração\
-   `test:` → testes\
-   `chore:` → tarefas internas

### ✅ Exemplos

    feat: adiciona sistema de login
    fix: corrige erro ao salvar usuário
    docs: atualiza instruções no README
    refactor: melhora organização do código
    test: adiciona testes para validação

------------------------------------------------------------------------

## ⚠️ Boas Práticas

-   Commits devem ser **curtos e objetivos**
-   Usar **verbo no presente** (ex: "adiciona", "corrige")
-   Evitar commits genéricos como:
    -   ❌ "update"
    -   ❌ "ajustes"
-   Sempre dar `git pull` antes de começar
-   Nunca trabalhar direto na `main`

------------------------------------------------------------------------

## 👥 Revisão de Código

-   Todo código deve passar por **Pull Request**
-   Revisar antes de fazer merge
-   Garantir que não há conflitos

