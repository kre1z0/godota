(function () {
    $('#add_channel').click(function () {
        $('.hidden_row').show();
        $('#add_channel').remove();
    });

    $('.js-btn-change').click(function (e) {
        var target = $(e.target);
        var cell = $(e.target).parent()
        target.closest('tr').find('input, textarea').attr('disabled', false);
        target.hide();
        target.next().show();
        return false;
    });

    $('.js-delete').click(function (e) {
        var num = $(e.target).data('num');
        var addr = $(e.target).data('addr');
        $('#delete').attr('action', "/" + addr + "/delete/" + num).submit();
        return false;
    });
})();