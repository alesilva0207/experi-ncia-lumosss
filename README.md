# Chalé Lumos Experience

### ⚠️ COMO SUBIR PARA O GITHUB (MUITO IMPORTANTE)

O erro que você viu acontece porque o Vercel não está encontrando o arquivo de entrada. Para resolver:

1. **Página Inicial do GitHub**: Quando você abre seu repositório no GitHub, você deve ver os arquivos **index.html** e **package.json** IMEDIATAMENTE.
2. **NÃO arraste a pasta do projeto**: Se você arrastar a pasta inteira, o GitHub vai criar uma pasta dentro do repositório (ex: `pousada-lumos/index.html`). Isso **NÃO** funciona.
3. **O que fazer**: 
   - Entre na pasta do projeto no seu computador.
   - Selecione tudo o que está **dentro** dela.
   - Arraste para o GitHub.

### Estrutura correta no GitHub:
```text
/src                <-- Pasta
.gitignore          <-- Arquivo
index.html          <-- Arquivo (DEVE ESTAR AQUI)
package.json        <-- Arquivo (DEVE ESTAR AQUI)
... outros arquivos
```

### Se você quiser manter a pasta:
Se você preferir deixar os arquivos dentro de uma pasta no GitHub, você precisará ir nas configurações do seu projeto no **Vercel** -> **Settings** -> **General** -> **Root Directory** e digitar o nome da pasta lá. Mas o recomendado é deixar na raiz como explicado acima.

**Ajuste feito:** Renomeei o arquivo principal para `main.tsx` para seguir o padrão mais rígido do Vite.
