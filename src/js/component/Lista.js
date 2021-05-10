import React, { useState, useEffect } from "react";
import { XCircle } from "react-bootstrap-icons";

const Lista = () => {
	const [tarea, setTarea] = useState("");
	const [listaTareas, setListaTareas] = useState([]);
	const [mouseOver, setMouseOver] = useState();

	const añadirTarea = event => {
		event.preventDefault();
		setListaTareas([...listaTareas, { label: tarea, done: false }]);
		setTarea("");
		updateListaTarea([...listaTareas, { label: tarea, done: false }]);
	};

	const deleteTarea = tareaIndex => {
		let nuevoArrayTareas = listaTareas.filter((element, index) => {
			if (tareaIndex != index) {
				return element;
			}
		});

		setListaTareas(nuevoArrayTareas);
		updateListaTarea(nuevoArrayTareas);
	};

	const updateListaTarea = listaactualizada => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/valentinacuello",
			{
				method: "PUT",
				body: JSON.stringify(listaactualizada),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	const getData = () => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/valentinacuello"
		)
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
				setListaTareas(data);
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="todo-body">
			<div className="todo-container">
				<h1>Lista de tareas</h1>
				<div className="todo-content">
					<form onSubmit={añadirTarea}>
						<input
							placeholder="Añadir tarea"
							onChange={event => setTarea(event.target.value)}
							value={tarea}></input>
					</form>
					<div className="lista">
						<ul>
							{listaTareas.map((obj, index) => {
								return (
									<li
										key={index}
										onMouseOver={() => {
											setMouseOver(index);
										}}
										onMouseOut={() => {
											setMouseOver();
										}}>
										<p>{obj.label}</p>
										<button
											onClick={() => {
												deleteTarea(index);
											}}
											className={
												"btn-delete " +
												(mouseOver == index
													? "active"
													: "")
											}>
											<XCircle />
										</button>
									</li>
								);
							})}
						</ul>
					</div>
					<div>
						<p>
							{listaTareas.length == 0
								? "No hay tareas"
								: "Cantidad de tareas : " + listaTareas.length}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Lista;
