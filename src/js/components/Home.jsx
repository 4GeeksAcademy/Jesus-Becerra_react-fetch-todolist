import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tasks, setTasks] = useState([])

	const enterPress = (event) => {
		const taskText = event.target.value.trim();
		if (event.key === "Enter" && taskText !== "") {
			setTasks([...tasks, taskText]);
			event.target.value = "";
		}
	};

	const deleteTask = (indexToDelete) => {
		const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(updatedTasks);
	}

	const items = tasks.length;

	return (
		<div className="d-flex flex-column text-center py-5 container">
			<h1 className="mt-5 fw-lighter text-secondary app-title">MY TO-DO LIST</h1>
			<div className="todo-container col-12 col-md-6 col-lg-4 mx-auto">
				<input
					className="form-control new-todo-input"
					type="text"
					placeholder="What needs to be done?..."
					onKeyPress={enterPress}
				/>
				{items > 0 && (
					<ul className="list-group todo-list">
						{tasks.map((task, index) => (
							<li key={index} className="list-group-item d-flex justify-content-between">
								{task}
								<button
									className="btn-close my-auto"
									aria-label="Cerrar"
									onClick={() => deleteTask(index)}
								></button>
							</li>
						))}
					</ul>
				)}
				<div className="d-flex px-3 border-top text-muted">
					{items === 0 ? (
						<span>No hay tareas</span>
					) : (
						<span>
							{items} {items === 1 ? "item" : "items"} left
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;