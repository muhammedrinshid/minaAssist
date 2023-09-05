from import_export import resources
from .models import Airline,Airport


class AirportResource(resources.ModelResource):



    class Meta:
        model=Airport
        import_id_fields=["country","airport_name","airport_code","airport_place"]
        skip_unchanged=True
        use_bulk=True
class AirlineResource(resources.ModelResource):



    class Meta:
        model=Airline
        import_id_fields=["ailine_name"]
        skip_unchanged=True
        use_bulk=True