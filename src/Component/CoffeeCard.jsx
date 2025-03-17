import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, quantity, supplier, taste, category, details, photo } =
    coffee;

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success",
              });
              const remaining = coffees.filter(coffee._id !== _id);
              setCoffees(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src={photo} alt="Movie" className="w-32 h-32 object-cover" />
      </figure>
      <div className="flex justify-between w-full pr-5">
        <div>
          <h2 className="card-title">name:{name}</h2>
          <p>quantity:{quantity}</p>
          <p>supplier:{supplier}</p>
          <p>taste:{taste}</p>
        </div>
        <div className="card-actions justify-end">
          <div className="flex flex-col space-y-4">
            <button className="btn btn-primary">VIEW</button>
            <Link to={`updateCoffee/${_id}`}>
              <button className="btn btn-secondary">EDIT</button>
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="btn btn-accent"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoffeeCard;
