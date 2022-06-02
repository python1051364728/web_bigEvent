$(function () {
    const data = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    }


    // 获取文章列表数据
    const initTable = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data,
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                // layer.msg('获取文章列表成功')
                let tableList = template('tpl-table', res)
                $('tbody').html(tableList)
                renderPage(res.total)
            }
        })
    }

    initTable()

    // 时间美化过滤器
    template.defaults.imports.dataFormat = function (date1) {
        let date = new Date(date1);
        let y = timeZero(date.getFullYear());
        let m = timeZero(date.getMonth() + 1);
        let d = timeZero(date.getDate());
        let h = timeZero(date.getHours());
        let f = timeZero(date.getMinutes());
        let s = timeZero(date.getSeconds());

        return y + '-' + m + '-' + d + '-' + h + '-' + f + '-' + s
    }

    const timeZero = n => n < 10 ? '0' + n : n

    // 初始化分类下拉框
    const form = layui.form;
    const initCate = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('分类下拉框初始化失败')
                }
                const selectList = template('tpl-cate', res)
                $('[name=cate_id]').html(selectList)
                form.render();
            }
        })
    }
    initCate();

    // 分类下拉框筛选功能
    $('#form-search').on('submit', (e) => {
        e.preventDefault();
        const cate_id = $('[name=cate_id]').val();
        // console.log(cate_id);
        const state = $('[name=state]').val();
        // console.log(state);
        data.cate_id = cate_id;
        data.state = state
        initTable()
    })


    // 渲染分页
    const laypage = layui.laypage
    // const jump = layui.jump
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: data.pagesize, // 每页显示几条数据
            curr: data.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                data.pagenum = obj.curr
                data.pagesize = obj.limit;
                if (!first) {
                    initTable()
                }
            }
        })
    }

    //使用事件委派删除文章数据
    $('tbody').on('click', '.btn-delete', function () {
        // 获取当前页面所有的删除按钮
        const len = $('.btn-delete').length;
        const id = $(this).attr('data-id');
        layer.confirm('是否删除?', { icon: 3, title: '文章' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: (res) => {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                    if (len === 1) {
                        data.pagenum = data.pagenum === 1 ? 1 : data.pagenum - 1;
                    }
                    initTable()
                    layer.close(index);
                }
            })

        });
    })

})