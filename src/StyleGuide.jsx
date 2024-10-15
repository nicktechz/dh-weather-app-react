function StyleGuide() {
  return (
    <>
      <h1>Primary Title</h1>
      <h2>Secondary Title</h2>
      <h3>Tertiary Title</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ea ad illo
        earum magnam, labore quisquam iste odit enim cumque pariatur, atque
        laboriosam tempore blanditiis dolor soluta voluptas nemo minima. Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Inventore sed odio
        similique corporis necessitatibus accusamus eaque facilis. Ratione rem
        aliquam quam eos voluptatum, et, in reprehenderit hic provident, dicta
        itaque!
      </p>
      <button className="btn btn-danger">I am a destructive button</button>
      <button className="btn btn-success">I am a confirmation button</button>
      <button className="btn btn-primary">I am a primary button</button>
      <button className="btn btn-primary btn-outline">
        I am a primary outline button
      </button>
      <button className="btn btn-secondary">I am a secondary button</button>
      <button className="btn btn-secondary btn-outline">
        I am a secondary outline button
      </button>
      <h1>Form styles</h1>
      <form action="" className="form-lg">
        <label htmlFor="" className="input-label">
          Ingresa tu nombre completo:
        </label>
        <input type="text" className="input" placeholder="John Doe" />
        <p className="input-helper-text">
          Nunca guardaremos tu informacion personal.&nbsp;
          <a href="" className="input-helper-text-link">
            Visita nuestra política de privacidad.
          </a>
        </p>
        <button className="btn btn-primary btn-form-full-width">
          Enviar formulario
        </button>
      </form>
    </>
  );
}

export default StyleGuide;
