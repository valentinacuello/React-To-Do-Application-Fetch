import React, { useState } from "react";

const Lista = () => {
	const [tarea, setTarea] = useState("");
	const [listaTareas, setListaTareas] = useState([]);

	const añadirTarea = event => {
		event.preventDefault();
		setListaTareas([...listaTareas, tarea]);
		setTarea("");
	};

	return (
		<div>
			<form onSubmit={añadirTarea}>
				<div className="form-row align-items-center">
					<div className="col-auto">
						<label className="sr-only" htmlFor="inlineFormInput">
							Name
						</label>
						<input
							type="text"
							className="form-control mb-2"
							id="inlineFormInput"
							placeholder="Añadir tarea"
							onChange={event => setTarea(event.target.value)}
							value={tarea}
						/>
					</div>
					<div className="col-auto">
						<button type="submit" className="btn btn-primary mb-2">
							Submit
						</button>
					</div>
				</div>
			</form>
			<div className="lista">
				<ul>
					{listaTareas.map((element, index) => {
						return <li key={index}>{element}</li>;
					})}
				</ul>
			</div>
			<div>
				<h5>hay {listaTareas.length} tareas</h5>
			</div>
		</div>
	);
};

export default Lista;
