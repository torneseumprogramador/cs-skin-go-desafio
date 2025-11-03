export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Termos de Uso
        </h1>

        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ao acessar e usar o SkinArena, você concorda em cumprir e estar vinculado aos seguintes termos e condições
              de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Elegibilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              Você deve ter pelo menos 18 anos de idade para usar o SkinArena. Ao criar uma conta, você declara e
              garante que tem pelo menos 18 anos e que todas as informações fornecidas são verdadeiras e precisas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Conta de Usuário</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Ao criar uma conta no SkinArena, você é responsável por:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Manter a confidencialidade de suas credenciais de login</li>
              <li>Todas as atividades que ocorrem em sua conta</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
              <li>Fornecer informações precisas e atualizadas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Abertura de Caixas</h2>
            <p className="text-muted-foreground leading-relaxed">
              As caixas no SkinArena contêm itens virtuais com diferentes níveis de raridade. Os resultados são
              determinados por um sistema de probabilidade justo. Cada caixa exibe claramente as chances de obter cada
              item. Uma vez aberta, a transação não pode ser revertida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Pagamentos e Reembolsos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos os pagamentos são processados de forma segura. Os valores adicionados à sua conta são finais e não
              reembolsáveis, exceto quando exigido por lei. Os preços estão sujeitos a alterações sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Propriedade dos Itens</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os itens obtidos através da abertura de caixas são virtuais e permanecem propriedade do SkinArena. Você
              recebe uma licença limitada, não exclusiva e não transferível para usar os itens dentro da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Conduta Proibida</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">É estritamente proibido:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Usar bots, scripts ou qualquer forma de automação</li>
              <li>Tentar manipular o sistema de probabilidades</li>
              <li>Criar múltiplas contas para obter vantagens indevidas</li>
              <li>Realizar atividades fraudulentas ou ilegais</li>
              <li>Assediar, ameaçar ou prejudicar outros usuários</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Suspensão e Encerramento</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reservamo-nos o direito de suspender ou encerrar sua conta a qualquer momento, sem aviso prévio, se
              violarmos estes termos ou se suspeitarmos de atividade fraudulenta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">9. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              O SkinArena não se responsabiliza por quaisquer danos diretos, indiretos, incidentais ou consequenciais
              resultantes do uso ou incapacidade de usar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">10. Alterações nos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a
              publicação. O uso continuado do serviço após as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">11. Contato</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para questões sobre estes termos, entre em contato através da nossa página de suporte.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
