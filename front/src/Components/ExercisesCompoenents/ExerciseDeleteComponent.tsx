import { useEffect, useState } from "react";
import { deleteItem, fetchItemById } from "../../api/DataApi";
import { Link, useParams } from "react-router-dom";
import { ExerciseDetail } from "../../interfaces/Exercises";

export default function DeleteExercise() {

    const params = useParams();

    const [selectedExercise, setSelectedExercise] = useState<ExerciseDetail | null>(null);

    useEffect(() => {
        const handleSelectExercise = async () => {
            try {
                const response = await fetchItemById<ExerciseDetail>('exercises', params.id);
                const detail = response.data; // Acceder a la propiedad data
                console.log(detail?.id);
                setSelectedExercise(detail);
            } catch (error) {
                console.error('Error fetching exercise detail:', error);
            }
        };

        handleSelectExercise()
    }, [params.id])

    const handleDeleteExercise = async () => {
        try {
            if (params.id !== null) {
                await deleteItem('exercises', params.id);
                console.log(`Exercise with ID ${params.id} deleted successfully.`);
            } else {
                console.error('Exercise ID is null.');
            }
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
        window.location.reload();
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-cyan-900 text-3xl m-8">Eliminar Ejercicio</h1>
            <div className="border border-gray-300 rounded-lg p-8 shadow-md bg-gray-400">
                <p className="text-lg font-semibold m-4">Quieres eliminar el ejercicio: {selectedExercise?.name}</p>
                <div className="flex flex-row justify-center gap-12 items-center">
                    <Link to={`/exercises`}>
                        <button className="w-36 h-12 rounded-lg text-xl text-white bg-red-700 hover:bg-red-600" onClick={handleDeleteExercise}>Eliminar</button>
                    </Link>
                    <Link to={`/exercises/${params.id}`}>
                        <button className="w-36 h-12 rounded-lg text-xl text-white bg-green-700 hover:bg-green-600 mr-4">Cancelar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}