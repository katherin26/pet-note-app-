import React from "react";
import { Link } from "react-router-dom";
import { convertTimestampToDate } from "../../utils";

export default function VaccinationsTable({
  vaccinations,
  clickOnEditHandler,
  clickOnDeleteHandler,
}) {
  const tableRows = vaccinations.map((vac, index) => (
    <tr key={index}>
      <td className="border px-4 py-2 text-center">{vac.name}</td>
      <td className="border px-4 py-2 text-center">
        {convertTimestampToDate(vac.date)}
      </td>
      <td className="border px-4 py-2 text-center">{vac.location}</td>
      <td className="border px-4 py-2 text-center">
        {convertTimestampToDate(vac.expiration)}
      </td>
      <td className="border px-4 py-2 text-center">
        ${vac.cost ? vac.cost : 0}
      </td>
      <td className="border px-4 py-2 text-center">{vac.comments}</td>
      <td className="border px-4 py-2 text-center">
        <button
          className="tooltip bg-orange-300 hover:bg-orange-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={() => clickOnEditHandler(vac)}
        >
          <i className="fas fa-pen-alt"></i>
          <span class="tooltiptext">Edit</span>
        </button>{" "}
        <button
          className="tooltip bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={() => clickOnDeleteHandler(vac)}
        >
          <i className="far fa-trash-alt"></i>
          <span class="tooltiptext">Remove</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-11/12 rounded overflow-hidden shadow-lg ">
        <div className="flex items-center justify-end">
          <Link
            to="/pet/records/vaccinations/add"
            className="tooltip m-4 p-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <span class="tooltiptext">Add</span>
            <i className="fas fa-plus"></i>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-11/12 rounded overflow-hidden shadow-lg  m-8 ">
            <table className=" w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-teal-800 font-bold ">NAME</th>
                  <th className="px-4 py-2 text-teal-800 font-bold">DATE</th>
                  <th className="px-4 py-2 text-teal-800 font-bold">
                    LOCATION
                  </th>
                  <th className="px-4 py-2 text-teal-800 font-bold">
                    DATE DUE
                  </th>
                  <th className="px-4 py-2 text-teal-800 font-bold">COST</th>
                  <th className="px-4 py-2 text-teal-800 font-bold">
                    PET-NOTE
                  </th>
                  <th className="px-4 py-2 text-teal-800 font-bold">
                    EDIT/REMOVE
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}