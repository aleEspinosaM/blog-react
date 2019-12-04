import React from 'react';

const TagList = ({list}) => {

    return (
        <div>
            {list.map(tag => {
                return (
                    <li className="tag-default tag-pill tag-outline" key={tag}>
                        {tag}
                    </li>
                )
            })}
        </div>
    );
};

export default TagList;