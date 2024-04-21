// List.js

'use strict';

const lists = document.querySelectorAll('[data-list]');
const sorts = document.querySelectorAll('[data-sort]');

if(lists.length) {
    import(/* webpackChunkName: 'list' */ 'list.js')
    .then(({default: List}) => {
        const init = list => {
            const userOptions = list.dataset.list ? JSON.parse(list.dataset.list) : {};
            const listPagination = list.querySelectorAll('.list-pagination');
            const listPaginationPages = list.querySelector('.list-pagination-pages');
            const listPaginationPrev = list.querySelector('.list-pagination-prev');
            const listPaginationNext = list.querySelector('.list-pagination-next');
            const listPaginationPageFirst = list.querySelector('.list-pagination-page-first');
            const listPaginationPageLast = list.querySelector('.list-pagination-page-last');
        
            const defaultOptions = {
                fuzzySearch: {
                    searchClass: 'list-fuzzy-search'
                },
                pagination: listPagination.length ? {item: '<li class="page-item"><a class="page page-link" href="javascript: void(0);"></a></li>'} : undefined,
                listClass: 'list',
                sortClass: 'list-sort',
                searchClass: 'list-search'
            };
        
            const options = {
                ...defaultOptions,
                ...userOptions
            };
        
            const listObj = new List(list, options);
        

            // Show/hide pagination
            const showHidePagination = pagination => {
                if(listObj.matchingItems.length <= listObj.page) {
                    pagination.style.display = 'none';
                } else {
                    pagination.style.display = 'flex';
                }
            }
        
            // Display page data
            listPaginationPageFirst && (listPaginationPageFirst.innerHTML = listObj.i);
            listPaginationPageLast && (listPaginationPageLast.innerHTML = listObj.page);
            listPaginationPages && (listPaginationPages.innerHTML = listObj.size());
        
            // Csutom pagination
            if (listPagination.length) {
                listPagination.forEach((pagination) => {
                    showHidePagination(pagination);
        
                    pagination.addEventListener('click', (e) => {
                        e.preventDefault();
                    });
                });
            }
        
            // Custom pagination (previous)
            if (listPaginationPrev) {
                listPaginationPrev.addEventListener('click', (e) => {
                    e.preventDefault();
            
                    const prevItem = parseInt(listObj.i) - parseInt(listObj.page);
        
                    // Enable/disable previous pagination button
                    prevItem === 1 ? listPaginationPrev.setAttribute('disabled', '') : listPaginationPrev.removeAttribute('disabled');
                    listPaginationNext && listPaginationNext.removeAttribute('disabled');
        
                    if (prevItem > 0) {
                        listObj.show(prevItem, listObj.page);
                    }
                });
            }

            // Custom pagination (next)
            if (listPaginationNext) {
                listObj.size() > listObj.page && listPaginationNext.removeAttribute('disabled');
        
                listPaginationNext.addEventListener('click', (e) => {
                    e.preventDefault();
            
                    const nextItem = parseInt(listObj.i) + parseInt(listObj.page);
            
                    // Enable/disable next pagination button
                    nextItem + listObj.page > listObj.size() ? listPaginationNext.setAttribute('disabled', '') : listPaginationNext.removeAttribute('disabled');
                    listPaginationPrev && listPaginationPrev.removeAttribute('disabled');
        
                    if (nextItem <= listObj.size()) {
                        listObj.show(nextItem, listObj.page);
                    }
                });
            }
        
            // Update events
            listObj.on('updated', () => {
                // Calculate showed page numbers
                const nextItem = parseInt(listObj.i);
        
                listPaginationPageFirst && (listPaginationPageFirst.innerHTML = nextItem);
                listPaginationPageLast && (listPaginationPageLast.innerHTML = (nextItem + parseInt(listObj.page) - 1) > listObj.size() ? listObj.size() : nextItem + parseInt(listObj.page) - 1);
            })
        }
        
        lists.forEach((list) => {
            init(list);
        });
        
        if (sorts.length) {
            sorts.forEach((sort) => {
                sort.addEventListener('click', (e) => {
                    e.preventDefault();
                });
            });
        }

        window.List = List;
    })
    .catch(console.warn);
}