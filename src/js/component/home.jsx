import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import ToDoList from "./toDoList.jsx";
//create your first component
const Home = () => {
	return (
		<div className="container vh-100">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 p-0">
					<h1 className="text-center">Todo List</h1>
				</div>
				<div className="todoListContainer col-5 p-0">
					<ToDoList />
				</div>
			</div>
		</div>
	);
};

export default Home;
