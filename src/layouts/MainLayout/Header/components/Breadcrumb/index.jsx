import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './styles.module.scss';

function Breadcrumb() {
    const titlePage = useSelector(state => state.app.title);
    const breadcrumb = useSelector(state => state.app.breadcrumb);

    const handleRenderItemBreadCrumb = (index, item) => {
        switch (index) {
            case breadcrumb.length - 1:
                return (
                    <span>{item.name}</span>
                );
            default:
                return (
                    <><Link to={item.path}><span className={`${styles.text}`}>{item.name}</span></Link> - </>
                );
        }
    };

    return (
        <div>
            {titlePage && breadcrumb?.length > 0 && (
                <div className={styles.headerMainWrap}>
                    <div className={styles.titleWrap}>{titlePage}</div>
                    <div className={styles.breadcrumbWrap}>
                        {breadcrumb.map((item, index) => {
                            return <span key={index}>{handleRenderItemBreadCrumb(index, item)}</span>;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Breadcrumb;
