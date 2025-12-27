import React from 'react';
import { Link } from 'react-router';

const ChallengesCard = () => {
    return (
      <div className="card bg-base-200 shadow-md">
        <figure>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.TTpcOl7--xWqZf2wqslokwHaFJ%3Fpid%3DApi&f=1&ipt=77751cdbc9b2b7452425683f84b0620e40888582b46ce170a95919c2319fe2ee&ipo=images"
            alt="blabla"
            className="h-40 w-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">bla bla</h2>

          <p className="text-sm opacity-70 line-clamp-3">bla bla</p>

          <div className="mt-2 text-sm">
            <p>
              <span className="font-semibold">Category:</span> bla bla
            </p>
            <p>
              <span className="font-semibold">Duration:</span>blabla days
            </p>
            <p>
              <span className="font-semibold">Impact:</span>blabla
            </p>
            <p>
              <span className="font-semibold">Participants:</span>blabla
            </p>
          </div>

          <div className="card-actions justify-end mt-4">
            <Link>
              <button className="btn btn-primary btn-sm">View Details</button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default ChallengesCard;