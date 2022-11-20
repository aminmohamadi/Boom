var requester=$CS.getValue("REQUESTER");
var subject=$CS.getValue("SUBJECT");
var selectedCamera=$CS.getText("GUDF_CHAR1");
var input_data = getInputData(requester,subject);
ajaxcall();
function getInputData(requester,subject,selectedCamera)
{
    var temp_data = "{\"list_info\": {\"row_count\": 100,\"start_index\": 1, \"get_total_count\": true,\"search_criteria\":{\"field\": \"status.name\", \"condition\": \"is\", \"logical_operator\": \"OR\",\"values\": [\"Open\",\"Assigned\",\"In Progress\"]},\"search_fields\": {\"template.id\":63,\"subject\": " + subject + ",\"udf_fields.udf_pick_56\":" + $CS.getText("GUDF_CHAR1") +"},  \"filter_by\":{\"name\": \"Open_System\" }}}";
    return temp_data;
}
function ajaxcall()
{
    jQuery.ajax({
        url: '/api/v3/requests',
        type: 'GET',
        dataType: 'json',
        headers: {'Accept': 'application/application/vnd.manageengine.v3+json'}, //NO I18N
        data:{'format' : 'json','input_data':input_data},
        success: function(response){
            handleResponse(response);
        },
        async: false
    });
}

function handleResponse(response)
{
    var count=response.list_info.total_count;
    if(count>0)
    {
        $CS.stopFormSubmission();
        showalert('failure',"در حال حاضر یک درخواست باز روی این دستگاه وجود داردو نیازی به ثبت درخواست دیگری نیست.\nباتشکر",'isAutoHide=false');
    }
} 
