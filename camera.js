$CS.stopFormSubmission();
var selectedCamera = $CS.getText("GUDF_CHAR1");//دوربین انتخابی کاربر
var categoryID = 63;// آی دی موضوع مورد نظر
var input_data = getInputData();

ajaxcall();

function getInputData()
{
    var temp_data = "{\"list_info\": {\"row_count\": 100,\"start_index\": 1, \"get_total_count\": true,\"sort_field\":\"id\",\"sort_order\" : \"asc\",\"search_criteria\":[{\"field\": \"template.id\", \"condition\": \"is\", \"value\":"+categoryID+", \"children\":[{\"field\": \"status.id\", \"condition\": \"is\", \"values\":[2, 5, 6], \"logical_operator\": \"OR\"}]},{\"field\": \"udf_fields.udf_pick_56\", \"condition\": \"is\", \"logical_operator\": \"and\", \"value\":" + selectedCamera +"}]}}";
    return temp_data;
}
function ajaxcall()
{
    jQuery.ajax({
        url: '/api/v3/requests',
        type: 'GET',
        dataType: 'json',
        headers: {'Accept': 'application/application/vnd.manageengine.v3+json'},
        data:{'format' : 'json','input_data':input_data},
        success: function(response){
            handleResponse(response);
        },
        async: false
    });
}

function handleResponse(response)
{
    var totalCount = response.list_info.total_count;
    if(totalCount > 0)
    {
        var request_list = response.requests;
        var workersID = [];
        for(var i=0;i<totalCount;i++)
        {
            workersID.push(request_list[i].id);
        }
        var  workersIDJoin = workersID.join(" و ");
        $CS.stopFormSubmission();
        showalert('failure',"در حال حاضر یک درخواست باز  با شماره "+ workersIDJoin +" روی این دوربین وجود دارد و نیازی به ثبت درخواست مجدد نیست.\nباتشکر",'isAutoHide=false');
    }
} 
