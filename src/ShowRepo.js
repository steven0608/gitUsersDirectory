import React from 'react';



const ShowRepo=(props) => {
  return(
    <div className="item">
      <i className="map marker icon"></i>
      <div className="content">
          <a className="header" href={props.repo.html_url}>{props.repo.name}</a>
        <div className="description">
          {props.repo.description} build using {props.repo.language}
          Last updated on {props.repo.updated_at.slice(0,10)}
        </div>
      </div>
      </div>

  )
}

  //<a className="header" href={}>{props.repo.name}</a>


export default ShowRepo;
