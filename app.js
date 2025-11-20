const { useState } = React;

const menuData = {
  title: 'Burger Joint',
  subtitle: 'Hambúrgueres artesanais, feitos com carinho',
  sections: [
    {
      id: 'entradas',
      title: 'Entradas',
      items: [
        { name: 'Batatas Rústicas', price: 18.90, desc: 'Batatas cortadas na casa, assadas e temperadas com ervas e páprica.' },
        { name: 'Onion Rings', price: 16.50, desc: 'Cebolas empanadas crocantes servidas com maionese da casa.' },
        { name: 'Pão de Alho Especial', price: 12.00, desc: 'Pão artesal com manteiga de ervas e queijo gratinado.' }
      ]
    },
    {
      id: 'hamburgueres',
      title: 'Hambúrgueres',
      items: [
        { name: 'Clássico Burger', price: 29.90, desc: '150g de blend bovino, queijo cheddar, alface, tomate e molho secreto no pão brioche.' },
        { name: 'Bacon BBQ', price: 34.50, desc: 'Blend bovino, bacon crocante, cebola caramelizada e molho barbecue defumado.' },
        { name: 'Cheese Melt', price: 32.00, desc: 'Queijo cheddar duplo, picles e manteiga de alho no pão tostado.' },
        { name: 'Burger Veggie', price: 28.00, desc: 'Hambúrguer de grãos e cogumelos, alface, tomate e molho de ervas.' }
      ]
    },
    {
      id: 'acompanhamentos',
      title: 'Acompanhamentos',
      items: [
        { name: 'Salada Coleslaw', price: 10.00, desc: 'Repolho crocante com molho cremoso e toque de limão.' },
        { name: 'Porção de Batata Frita', price: 14.50, desc: 'Fritas douradas, servidas com ketchup e maionese.' },
        { name: 'Anéis de Cebola', price: 15.00, desc: 'Empanados e crocantes, perfeitos para compartilhar.' }
      ]
    },
    {
      id: 'sobremesas',
      title: 'Sobremesas',
      items: [
        { name: 'Brownie com Sorvete', price: 18.00, desc: 'Brownie quente com uma bola de sorvete de baunilha e calda de chocolate.' },
        { name: 'Cheesecake', price: 17.50, desc: 'Cheesecake cremoso com calda de frutas vermelhas.' }
      ]
    }
  ],
  drinks: [
    { name: 'Refrigerante (lata)', price: 7.50 },
    { name: 'Suco Natural', price: 9.90 },
    { name: 'Cerveja Long Neck', price: 12.00 },
    { name: 'Água Mineral', price: 5.00 }
  ]
};

function Money({ value }) {
  // Format as BRL
  return <span className="price">R$ {value.toFixed(2).replace('.', ',')}</span>;
}

function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div className="brand">
        <svg className="brand-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <g fill="#b22222">
            <rect x="8" y="20" width="48" height="8" rx="4" />
            <rect x="12" y="30" width="40" height="6" rx="3" />
            <path d="M16 14c0-4 8-6 16-6s16 2 16 6v6H16v-6z" fill="#d2691e" />
          </g>
        </svg>
        <div>
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => window.print()} className="print-btn">Imprimir (A4)</button>
      </div>
    </header>
  );
}

function Section({ section }) {
  return (
    <section className="section" aria-labelledby={section.id}>
      <h2 id={section.id} className="section-title">{section.title}</h2>
      <ul className="items">
        {section.items.map((it, idx) => (
          <li key={idx} className="item">
            <div className="item-main">
              <div className="item-name">{it.name}</div>
              <Money value={it.price} />
            </div>
            <div className="item-desc">{it.desc}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Drinks({ drinks }) {
  return (
    <aside className="drinks">
      <h3>Bebidas</h3>
      <ul>
        {drinks.map((d, i) => (
          <li key={i} className="drink-item"><span>{d.name}</span> <Money value={d.price} /></li>
        ))}
      </ul>
    </aside>
  );
}

function App() {
  const [data] = useState(menuData);
  return (
    <div className="menu-root">
      <Header title={data.title} subtitle={data.subtitle} />
      <main className="menu">
        <div className="main-col">
          {data.sections.map(s => <Section key={s.id} section={s} />)}
        </div>
        <div className="side-col">
          <Drinks drinks={data.drinks} />
        </div>
      </main>
      <footer className="foot-note">* Produtos sujeitos à disponibilidade. Preços em R$ (BRL).</footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);