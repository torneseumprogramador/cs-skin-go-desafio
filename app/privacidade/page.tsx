export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Política de Privacidade
        </h1>

        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introdução</h2>
            <p className="text-muted-foreground leading-relaxed">
              O SkinArena está comprometido em proteger sua privacidade. Esta política descreve como coletamos, usamos e
              protegemos suas informações pessoais quando você usa nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Informações que Coletamos</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Coletamos as seguintes informações:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Informações de Conta:</strong> Nome, e-mail, data de nascimento
              </li>
              <li>
                <strong>Informações de Pagamento:</strong> Dados de transações e histórico de compras
              </li>
              <li>
                <strong>Informações de Uso:</strong> Atividades na plataforma, caixas abertas, itens obtidos
              </li>
              <li>
                <strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, dispositivo
              </li>
              <li>
                <strong>Cookies:</strong> Dados de navegação e preferências
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Como Usamos suas Informações</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Utilizamos suas informações para:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Processar transações e pagamentos</li>
              <li>Gerenciar sua conta e inventário</li>
              <li>Enviar notificações importantes sobre sua conta</li>
              <li>Prevenir fraudes e garantir a segurança da plataforma</li>
              <li>Cumprir obrigações legais</li>
              <li>Personalizar sua experiência</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Compartilhamento de Informações</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Não vendemos suas informações pessoais. Podemos compartilhar suas informações com:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Processadores de Pagamento:</strong> Para processar transações financeiras
              </li>
              <li>
                <strong>Provedores de Serviços:</strong> Que nos ajudam a operar a plataforma
              </li>
              <li>
                <strong>Autoridades Legais:</strong> Quando exigido por lei ou para proteger nossos direitos
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Segurança dos Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso
              não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia, firewalls e controles de
              acesso rigorosos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Cookies e Tecnologias Similares</h2>
            <p className="text-muted-foreground leading-relaxed">
              Usamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e
              personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Seus Direitos</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Você tem o direito de:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações imprecisas</li>
              <li>Solicitar a exclusão de suas informações</li>
              <li>Opor-se ao processamento de suas informações</li>
              <li>Solicitar a portabilidade de seus dados</li>
              <li>Retirar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Retenção de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mantemos suas informações pessoais pelo tempo necessário para fornecer nossos serviços e cumprir
              obrigações legais. Quando não forem mais necessárias, excluiremos ou anonimizaremos suas informações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">9. Menores de Idade</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nossos serviços são destinados apenas a pessoas com 18 anos ou mais. Não coletamos intencionalmente
              informações de menores de idade. Se tomarmos conhecimento de que coletamos dados de um menor, excluiremos
              essas informações imediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">10. Transferências Internacionais</h2>
            <p className="text-muted-foreground leading-relaxed">
              Suas informações podem ser transferidas e processadas em países diferentes do seu país de residência.
              Garantimos que essas transferências sejam realizadas de acordo com as leis de proteção de dados
              aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">11. Alterações nesta Política</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos atualizar esta política periodicamente. Notificaremos você sobre alterações significativas através
              do e-mail cadastrado ou de um aviso em nossa plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">12. Contato</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para questões sobre privacidade ou para exercer seus direitos, entre em contato através da nossa página de
              suporte ou envie um e-mail para privacidade@skinarena.com.
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
